import { auth, db } from '../config/firebase.js';
import { stripe } from '../config/stripe.js';
// POST /api/auth/signup
export const signup = async (req, res) => {
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
    }
    catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ error: error.message || 'Error occurred during signup' });
    }
};
// POST /api/auth/social-sync (Google/Social Login)
export const socialSync = async (req, res) => {
    try {
        const { uid, email, displayName } = req.body;
        if (!uid || !email) {
            res.status(400).json({ error: 'Missing uid or email for synchronization' });
            return;
        }
        // Check if user already exists
        const userDocRef = db.collection('users').doc(uid);
        const userSnapshot = await userDocRef.get();
        if (userSnapshot.exists) {
            res.status(200).json({ message: 'User already synchronized', user: userSnapshot.data() });
            return;
        }
        // Create new user record for social login
        // 1. Create Stripe Customer
        const customer = await stripe.customers.create({
            email,
            name: displayName || 'Valued Member',
            metadata: { uid }
        });
        // 2. Save to Firestore with defaults
        const userDoc = {
            uid,
            email,
            displayName: displayName || 'Valued Member',
            charityId: 'global-impact-fund', // Default fallback
            charityContributionPercent: 10, // Default fallback
            subscriptionStatus: 'expired',
            stripeCustomerId: customer.id,
            role: 'user',
            createdAt: new Date(),
            updatedAt: new Date()
        };
        await userDocRef.set(userDoc);
        res.status(201).json({
            message: 'Social user synchronized successfully',
            user: userDoc
        });
    }
    catch (error) {
        console.error('Social sync error:', error);
        res.status(500).json({ error: error.message || 'Error occurred during social synchronization' });
    }
};
//# sourceMappingURL=authController.js.map