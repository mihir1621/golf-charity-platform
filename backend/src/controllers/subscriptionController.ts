import type { Request, Response } from 'express';
import { db } from '../config/firebase.js';
import stripe from '../config/stripe.js';
import type { AuthRequest } from '../middleware/authMiddleware.js';
import { createNotification } from './notificationController.js';

export const createSubscription = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const uid = req.user?.uid;
    const { planType } = req.body; // 'member', 'elite', 'masters', 'monthly', or 'yearly'

    const userDoc = await db.collection('users').doc(uid!).get();
    let userData = userDoc.data();

    // Recover profile if Auth user exists but Firestore doc is missing
    if (!userData) {
      console.log(`Profile Recovery: Reconstructing ghost user record for uid ${uid}`);
      userData = {
        uid: uid!,
        email: req.user?.email || '',
        displayName: 'Clubhouse Member',
        charityId: 'default_impact', // Placeholder for broken profiles
        charityContributionPercent: 20,
        subscriptionStatus: 'expired',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      await db.collection('users').doc(uid!).set(userData);
    }

    // Auto-repair for old accounts missing Stripe Customer ID
    if (!userData.stripeCustomerId) {
      console.log(`Auto-repair: Creating Stripe Customer for existing user ${uid}`);
      try {
        const customer = await stripe.customers.create({
          email: userData.email,
          name: userData.displayName,
          metadata: { uid: uid! }
        });
        
        await db.collection('users').doc(uid!).update({
          stripeCustomerId: customer.id,
          updatedAt: new Date()
        });
        
        userData.stripeCustomerId = customer.id;
      } catch (stripeErr: any) {
        console.error('Auto-repair failed:', stripeErr);
        res.status(500).json({ error: 'Failed to initialize Stripe customer identity' });
        return;
      }
    }

    let priceId = '';
    // ... plan logic remains same 
    // Wait, I'll just keep the existing IDs
    if (planType === 'member') priceId = process.env.STRIPE_PRICE_MEMBER || '';
    else if (planType === 'elite') priceId = process.env.STRIPE_PRICE_ELITE || '';
    else if (planType === 'masters') priceId = process.env.STRIPE_PRICE_MASTERS || '';
    else if (planType === 'monthly') priceId = process.env.STRIPE_PRICE_MONTHLY || '';
    else if (planType === 'yearly') priceId = process.env.STRIPE_PRICE_YEARLY || '';

    if (!priceId) {
      console.error(`Subscription failed: No Stripe Price ID found in .env for tier: ${planType}`);
      res.status(500).json({ error: `Stripe configuration error: Tier ${planType} is not mapped to a Price ID.` });
      return;
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      customer: userData.stripeCustomerId,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/subscribe`,
      metadata: { planType, uid: userData.uid }
    });

    res.status(200).json({ checkoutUrl: session.url });
  } catch (error: any) {
    console.error('CRITICAL: Checkout Session Failure:', error);
    res.status(500).json({ 
      error: error.message,
      code: error.code || 'checkout_failed_internal',
      details: 'Check backend console logs for full stack trace.'
    });
  }
};

export const handleStripeWebhook = async (req: Request, res: Response): Promise<void> => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;
  try {
    // req.body should be robustly treated as raw buffer from express.raw()
    event = stripe.webhooks.constructEvent(req.body, sig as string, endpointSecret!);
  } catch (err: any) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  try {
    const dataObject = event.data.object as any;

    // Handle the event
    switch (event.type) {
      case 'invoice.payment_succeeded': {
        const customerId = dataObject.customer;
        
        // Find user by stripeCustomerId
        const usersMatch = await db.collection('users').where('stripeCustomerId', '==', customerId).get();
        if (!usersMatch.empty) {
          const userDocInfo = usersMatch.docs[0];
          if (userDocInfo) {
            await userDocInfo.ref.update({
              subscriptionStatus: 'active',
              updatedAt: new Date()
            });

            // Create subscription record
            await db.collection('subscriptions').add({
              userId: userDocInfo.id,
              stripeSubscriptionId: dataObject.subscription,
              planType: dataObject.lines?.data[0]?.price?.recurring?.interval === 'year' ? 'yearly' : 'monthly',
              status: 'active',
              currentPeriodStart: new Date(dataObject.lines?.data[0]?.period?.start * 1000),
              currentPeriodEnd: new Date(dataObject.lines?.data[0]?.period?.end * 1000),
              cancelAtPeriodEnd: false,
              createdAt: new Date(),
              updatedAt: new Date()
            });
          }
        }
        break;
      }
      case 'customer.subscription.deleted': {
        const customerId = dataObject.customer;
        const usersMatch = await db.collection('users').where('stripeCustomerId', '==', customerId).get();
        if (!usersMatch.empty) {
          const userDocInfo = usersMatch.docs[0];
          if (userDocInfo) {
            await userDocInfo.ref.update({
              subscriptionStatus: 'cancelled',
              updatedAt: new Date()
            });
          }
        }
        break;
      }
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const verifySession = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { sessionId } = req.query;
    if (!sessionId) {
      res.status(400).json({ error: 'Missing sessionId' });
      return;
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId as string);
    if (session.payment_status === 'paid') {
      const uid = req.user?.uid;

      // Ensure a subscription record exists in the billing ledger
      const existing = await db.collection('subscriptions')
        .where('stripeSessionId', '==', sessionId)
        .get();
      
      if (existing.empty) {
        await db.collection('subscriptions').add({
          userId: uid,
          stripeSessionId: sessionId,
          status: 'active',
          planType: session.metadata?.planType || 'monthly',
          amount: (session.amount_total || 0) / 100,
          createdAt: new Date()
        });
      }

      await db.collection('users').doc(uid!).update({
        subscriptionStatus: 'active',
        updatedAt: new Date()
      });

      // Notify the user of their new membership status
      await createNotification(
        uid!, 
        'membership', 
        'Membership Active', 
        `Welcome to the Digital Clubhouse! Your ${session.metadata?.planType || 'monthly'} plan is now active.`
      );

      res.status(200).json({ status: 'active' });
    } else {
      res.status(200).json({ status: session.payment_status });
    }
  } catch (error: any) {
    console.error('Session Verification error:', error);
      res.status(500).json({ error: error.message });
  }
};

export const createPortalSession = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const uid = req.user?.uid;
    const userDoc = await db.collection('users').doc(uid!).get();
    const userData = userDoc.data();

    if (!userData?.stripeCustomerId) {
      res.status(400).json({ error: 'No active Stripe customer found for this account.' });
      return;
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: userData.stripeCustomerId,
      return_url: `${process.env.FRONTEND_URL}/billing`,
    });

    res.status(200).json({ url: session.url });
  } catch (error: any) {
    console.error('Portal session creation failed:', error);
    res.status(500).json({ error: error.message });
  }
};

export const getReceipt = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { sessionId } = req.query;
    if (!sessionId) {
      res.status(400).json({ error: 'Missing sessionId' });
      return;
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId as string, {
      expand: ['invoice']
    });

    const invoice = session.invoice as any;
    if (invoice?.hosted_invoice_url) {
      res.status(200).json({ url: invoice.hosted_invoice_url });
    } else {
      // Fallback for one-time payments or cases where invoice isn't yet ready
      const sessionRetrieved = await stripe.checkout.sessions.retrieve(sessionId as string);
      if (sessionRetrieved.payment_intent) {
        const pi = await stripe.paymentIntents.retrieve(sessionRetrieved.payment_intent as string);
        if (pi.latest_charge) {
          const charge = await stripe.charges.retrieve(pi.latest_charge as string);
          if (charge.receipt_url) {
            res.status(200).json({ url: charge.receipt_url });
            return;
          }
        }
      }
      res.status(404).json({ error: 'Receipt not found yet. It may still be generating.' });
    }
  } catch (error: any) {
    console.error('Receipt retrieval failed:', error);
    res.status(500).json({ error: error.message });
  }
};

