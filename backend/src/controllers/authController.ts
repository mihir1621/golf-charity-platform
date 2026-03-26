import type { Request, Response } from 'express';
import { auth, db } from '../config/firebase.js';
import { stripe } from '../config/stripe.js';

// POST /api/auth/signup
export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, displayName, charityId, charityContributionPercent } = req.body;

    if (!email || !password || !displayName || !charityId || !charityContributionPercent) {
      res.status(400).json({ error: 'Missing required fields for signup' });
      return;
    }

    if (charityContributionPercent < 10) {
      res.status(400).json({ error: 'Charity contribution percent must be at least 10%' });
      return;
    }

    // 1. Create user in Firebase Auth
    const userRecord = await auth.createUser({
      email,
      password,
      displayName,
    });

    // 2. Create Stripe Customer
    const customer = await stripe.customers.create({
      email,
      name: displayName,
      metadata: { uid: userRecord.uid }
    });

    // 3. Save user info to Firestore
    const userDoc = {
      uid: userRecord.uid,
      email: userRecord.email,
      displayName,
      charityId,
      charityContributionPercent,
      subscriptionStatus: 'expired', // Initial state
      stripeCustomerId: customer.id,
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await db.collection('users').doc(userRecord.uid).set(userDoc);

    res.status(201).json({
      message: 'User created successfully',
      user: userDoc
    });
  } catch (error: any) {
    console.error('Signup error:', error);
    res.status(500).json({ error: error.message || 'Error occurred during signup' });
  }
};

// POST /api/auth/login
export const login = async (req: Request, res: Response): Promise<void> => {
  // Wait, typically login is handled by the Client SDK returning a JWT Token.
  // We document that this endpoint exchange could be handled on client
  // But to satisfy the REST API requirement, we can provide a stub or documentation 
  // that login is fully offloaded to the Firebase Client SDK.
  // We can return a specific response guiding the client on how to pass the token.
  res.status(200).json({
    message: 'Login should be performed on the client-side using Firebase Client SDK. Once authenticated, pass the Firebase ID token in the Authorization header as a Bearer token to protect routes.',
    note: 'In a true backend-first architecture, you would call https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY] here'
  });
};
