import type { Response } from 'express';
import { db } from '../config/firebase.js';
import type { AuthRequest } from '../middleware/authMiddleware.js';

export const getProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const uid = req.user?.uid;
    const userDoc = await db.collection('users').doc(uid!).get();

    if (!userDoc.exists) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.status(200).json(userDoc.data());
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const uid = req.user?.uid;
    const { displayName, charityId, charityContributionPercent } = req.body;

    const updates: any = { updatedAt: new Date() };
    if (displayName) updates.displayName = displayName;
    if (charityId) updates.charityId = charityId;
    if (charityContributionPercent && charityContributionPercent >= 10) {
      updates.charityContributionPercent = charityContributionPercent;
    }

    await db.collection('users').doc(uid!).update(updates);

    const updatedUser = await db.collection('users').doc(uid!).get();

    res.status(200).json({ message: 'Profile updated', user: updatedUser.data() });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getInvoices = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const uid = req.user?.uid;
    const subscriptions = await db.collection('subscriptions')
      .where('userId', '==', uid)
      .orderBy('createdAt', 'desc')
      .get();

    const invoices = subscriptions.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        date: data.createdAt?.toDate 
          ? data.createdAt.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
          : new Date(data.createdAt?._seconds * 1000 || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        plan: data.planType === 'yearly' ? 'Masters Annual' : 'Clubhouse Monthly',
        type: 'Subscription',
        status: data.status === 'active' ? 'Paid' : 'Pending',
        amount: `$${data.amount || '0.00'}`
      };
    });

    res.status(200).json(invoices);
  } catch (error: any) {
    console.error('Invoices error:', error);
    res.status(500).json({ error: error.message });
  }
};

export const updateCharity = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const uid = req.user?.uid;
    const { charityId } = req.body;

    if (!charityId) {
      res.status(400).json({ error: 'Missing charityId' });
      return;
    }

    await db.collection('users').doc(uid!).update({
      charityId,
      updatedAt: new Date()
    });

    res.status(200).json({ message: 'Impact target updated' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
