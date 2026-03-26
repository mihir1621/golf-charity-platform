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
