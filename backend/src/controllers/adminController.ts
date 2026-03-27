import type { Response } from 'express';
import { db } from '../config/firebase.js';
import type { AuthRequest } from '../middleware/authMiddleware.js';

export const getAdminStats = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const uid = req.user?.uid;
    const userDoc = await db.collection('users').doc(uid!).get();
    if (userDoc.data()?.role !== 'admin') {
      res.status(403).json({ error: 'Access Denied: Admin privileges required.' });
      return;
    }

    // 1. User Stats
    const totalUsers = await db.collection('users').count().get();
    const activeSubscribers = await db.collection('users').where('subscriptionStatus', '==', 'active').count().get();

    // 2. Prize Pool Stats
    const globalStats = await db.collection('stats').doc('global').get();
    const currentRollover = globalStats.data()?.rolloverAmount || 0;

    // 3. Charity Stats
    const charitiesSnapshot = await db.collection('charities').get();
    const charityTotals = charitiesSnapshot.docs.reduce((acc, doc) => {
      return acc + (doc.data().totalRaised || 0);
    }, 0);

    // 4. Draw Stats
    const drawsSnapshot = await db.collection('draws').orderBy('executedAt', 'desc').limit(5).get();
    const recentDraws = drawsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    res.status(200).json({
      overview: {
        totalUsers: totalUsers.data().count,
        activeSubscribers: activeSubscribers.data().count,
        charityTotals,
        currentRollover
      },
      recentDraws
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllWinners = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const uid = req.user?.uid;
    const userDoc = await db.collection('users').doc(uid!).get();
    if (userDoc.data()?.role !== 'admin') {
      res.status(403).json({ error: 'Access Denied: Admin privileges required.' });
      return;
    }

    const resultsSnapshot = await db.collection('results')
      .orderBy('createdAt', 'desc')
      .get();
      
    const results = resultsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(results);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
