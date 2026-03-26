import type { Response } from 'express';
import { db } from '../config/firebase.js';
import type { AuthRequest } from '../middleware/authMiddleware.js';

export const runDraw = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { monthYear, isSimulation } = req.body;
    
    // 1. Admin Authorization check
    const uid = req.user?.uid;
    const userDoc = await db.collection('users').doc(uid!).get();
    if (userDoc.data()?.role !== 'admin') {
      res.status(403).json({ error: 'Access Denied: Admin privileges required.' });
      return;
    }

    // 2. Generate Winning Numbers (e.g., 5 numbers between 1-45)
    // Using a simple algorithm: Random 5 unique scores
    const winningNumbers: number[] = [];
    while (winningNumbers.length < 5) {
      const r = Math.floor(Math.random() * 45) + 1;
      if (!winningNumbers.includes(r)) winningNumbers.push(r);
    }

    // 3. Find Winners
    // Logic: Compare user's last 5 scores against winning numbers
    const usersSnapshot = await db.collection('users').where('subscriptionStatus', '==', 'active').get();
    
    interface WinningResult {
      userId: string;
      matches: number;
      tier: string;
    }
    const winners: WinningResult[] = [];

    for (const user of usersSnapshot.docs) {
      const scoresSnapshot = await db.collection('scores')
        .where('userId', '==', user.id)
        .orderBy('date', 'desc')
        .limit(5)
        .get();
      
      const userScores = scoresSnapshot.docs.map(doc => doc.data().value);
      
      // Calculate matches
      const matchCount = userScores.filter(s => winningNumbers.includes(s)).length;
      
      if (matchCount >= 3) {
        winners.push({
          userId: user.id,
          matches: matchCount,
          tier: matchCount === 5 ? '5-match' : matchCount === 4 ? '4-match' : '3-match'
        });
      }
    }

    // 4. Calculate Prize Pool Distributions
    // Current Prize Pool calculation normally derived from subscription revenue
    const totalPrizePool = 10000; // Mock total pool for demonstration
    const distributions = {
      '5-match': 0.40 * totalPrizePool,
      '4-match': 0.35 * totalPrizePool,
      '3-match': 0.25 * totalPrizePool
    };

    const drawResults: any[] = [];
    
    // Split prize pools among winners in each tier
    ['5-match', '4-match', '3-match'].forEach(tier => {
      const tierWinners = winners.filter(w => w.tier === tier);
      if (tierWinners.length > 0) {
        const prizePerWinner = distributions[tier as keyof typeof distributions] / tierWinners.length;
        tierWinners.forEach(winner => {
          drawResults.push({
            userId: winner.userId,
            matchTier: tier,
            prizeAmount: prizePerWinner,
            paymentStatus: 'pending',
            createdAt: new Date()
          });
        });
      }
    });

    // 5. Persist Results & Draw record
    if (!isSimulation) {
      const drawRef = await db.collection('draws').add({
        monthYear,
        status: 'completed',
        totalPrizePool,
        winningNumbers,
        executedAt: new Date(),
        createdAt: new Date()
      });

      const batch = db.batch();
      drawResults.forEach(res => {
        const docRef = db.collection('results').doc();
        batch.set(docRef, { ...res, drawId: drawRef.id });
      });
      await batch.commit();

      res.status(200).json({ 
        message: 'Draw completed and results published.',
        drawId: drawRef.id,
        winnersFound: winners.length,
        winningNumbers 
      });
    } else {
      res.status(200).json({ 
        message: 'Simulation successful.', 
        results: drawResults, 
        winningNumbers 
      });
    }

  } catch (error: any) {
    console.error('Draw error:', error);
    res.status(500).json({ error: error.message });
  }
};

export const getResults = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const uid = req.user?.uid;
    // Return performance history & winnings for the specific user
    const resultsSnapshot = await db.collection('results')
      .where('userId', '==', uid)
      .orderBy('createdAt', 'desc')
      .get();
      
    const results = resultsSnapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(results);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
