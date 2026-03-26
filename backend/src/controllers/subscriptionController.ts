import type { Request, Response } from 'express';
import { db } from '../config/firebase.js';
import stripe from '../config/stripe.js';
import type { AuthRequest } from '../middleware/authMiddleware.js';

export const createSubscription = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const uid = req.user?.uid;
    const { planType } = req.body; // 'monthly' or 'yearly'

    const userDoc = await db.collection('users').doc(uid!).get();
    const userData = userDoc.data();

    if (!userData || !userData.stripeCustomerId) {
      res.status(400).json({ error: 'User missing Stripe Customer ID' });
      return;
    }

    const priceId = planType === 'monthly' ? process.env.STRIPE_MONTHLY_PRICE_ID : process.env.STRIPE_YEARLY_PRICE_ID;

    if (!priceId) {
      res.status(500).json({ error: 'Stripe configuration error' });
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
      success_url: `${process.env.FRONTEND_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/subscribe`,
    });

    res.status(200).json({ checkoutUrl: session.url });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
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
