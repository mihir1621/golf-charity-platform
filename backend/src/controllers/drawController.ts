import type { Response } from 'express';
import { db } from '../config/firebase.js';
import type { AuthRequest } from '../middleware/authMiddleware.js';
import { createNotification } from './notificationController.js';

export const runDraw = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { 
      monthYear = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }), 
      isSimulation = false 
    } = req.body || {};
    
    // 1. Admin Authorization check
    const uid = req.user?.uid;
    const userDocRef = db.collection('users').doc(uid!);
    const userDoc = await userDocRef.get();
    if (userDoc.data()?.role !== 'admin') {
      res.status(403).json({ error: 'Access Denied: Admin privileges required.' });
      return;
    }

    // 2. Fetch current global Prize Pool & Rollover from last draw
    const statsRef = db.collection('stats').doc('global');
    const statsDoc = await statsRef.get();
    const currentRollover = statsDoc.data()?.rolloverAmount || 0;
    
    // Logic: Calculate prize pool based on total active subscribers
    const activeSubscribers = await db.collection('users').where('subscriptionStatus', '==', 'active').count().get();
    const subscriberCount = activeSubscribers.data().count;
    
    // Mock formula: $5 per subscriber goes to pool
    const newPoolContribution = subscriberCount * 5;
    const totalPrizePool = newPoolContribution + currentRollover;

    // 3. Generate Winning Numbers (e.g., 5 unique numbers between 1-45)
    const winningNumbers: number[] = [];
    while (winningNumbers.length < 5) {
      const r = Math.floor(Math.random() * 45) + 1;
      if (!winningNumbers.includes(r)) winningNumbers.push(r);
    }

    // 4. Find Winners
    const usersSnapshot = await db.collection('users')
      .where('subscriptionStatus', '==', 'active')
      .get();
    
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
      const matchCount = userScores.filter(s => winningNumbers.includes(s)).length;
      
      if (matchCount >= 3) {
        winners.push({
          userId: user.id,
          matches: matchCount,
          tier: matchCount === 5 ? '5-match' : matchCount === 4 ? '4-match' : '3-match'
        });
      }
    }

    // 5. PRD Tier Mapping & Prize Logic
    const PRD_PRIZES = [
      { matches: 5, amount: 2000, maxWinners: 1, tierName: 'match-5' },
      { matches: 4, amount: 500, maxWinners: 2, tierName: 'match-4' },
      { matches: 3, amount: 100, maxWinners: 5, tierName: 'match-3' },
      { matches: 2, amount: 50, maxWinners: 10, tierName: 'match-2' },
      { matches: 1, amount: 10, maxWinners: 20, tierName: 'match-1' }
    ];

    let nextRollover = 0;
    const drawResults: any[] = [];
    
    PRD_PRIZES.forEach(tier => {
      // Find eligible winners for this tier
      const eligible = winners.filter(w => w.matches === tier.matches);
      const tierWinners = eligible.slice(0, tier.maxWinners);
      
      if (tierWinners.length > 0) {
        tierWinners.forEach(winner => {
          drawResults.push({
            userId: winner.userId,
            matchTier: tier.tierName,
            prizeAmount: tier.amount,
            charityAmount: tier.amount * 0.1, // Platform adds 10% charity gift per PRD 03.1
            paymentStatus: 'pending',
            monthYear,
            createdAt: new Date()
          });
        });
      } else if (tier.matches === 5) {
        // Rollover Match-5 pool if no winners
        // The rollover amount for Match 5 is £2,000 as per PRD
        nextRollover = tier.amount;
      }
    });

    // 6. Persist Results
    if (!isSimulation) {
      const drawRef = await db.collection('draws').add({
        monthYear,
        status: 'completed',
        totalPrizePool,
        winningNumbers,
        executedBy: uid,
        executedAt: new Date(),
        rolloverAdded: nextRollover,
        createdAt: new Date()
      });

      // Update global stats with rollover for next time
      await statsRef.set({ rolloverAmount: nextRollover }, { merge: true });

      const batch = db.batch();
      // Use for...of to handle await inside loop correctly for notifications
      for (const resItem of drawResults) {
        const docRef = db.collection('results').doc();
        batch.set(docRef, { ...resItem, drawId: drawRef.id });
        
        // Notify the winner
        await createNotification(
          resItem.userId,
          'draw',
          'You Won a Prize!',
          `Congratulations! You matched scores in the ${monthYear} draw and won £${resItem.prizeAmount}.`
        );
      }
      await batch.commit();

      res.status(200).json({ 
        message: 'Draw completed and results published.',
        drawId: drawRef.id,
        winnersFound: winners.length,
        winningNumbers,
        rollover: nextRollover
      });
    } else {
      res.status(200).json({ 
        message: 'Simulation successful.', 
        results: drawResults, 
        winningNumbers,
        potentialRollover: nextRollover 
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

export const getDrawHistory = async (_req: AuthRequest, res: Response): Promise<void> => {
  try {
    const drawsSnapshot = await db.collection('draws')
      .limit(100)
      .get();
      
    let draws = drawsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() as any }));
    
    // In-memory sort
    draws.sort((a,b) => {
      const dateA = a.executedAt?._seconds ? a.executedAt._seconds : new Date(a.executedAt).getTime();
      const dateB = b.executedAt?._seconds ? b.executedAt._seconds : new Date(b.executedAt).getTime();
      return dateB - dateA;
    });

    res.status(200).json(draws);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getLatestDraw = async (_req: AuthRequest, res: Response): Promise<void> => {
  try {
    const latestSnapshot = await db.collection('draws')
      .orderBy('executedAt', 'desc')
      .limit(1)
      .get();
      
    if (latestSnapshot.empty) {
      res.status(200).json(null);
      return;
    }
    
    const draw = latestSnapshot.docs[0];
    if (!draw) {
      res.status(200).json(null);
      return;
    }
    res.status(200).json({ id: draw.id, ...draw.data() });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getGlobalStats = async (_req: AuthRequest, res: Response): Promise<void> => {
  try {
    const statsDoc = await db.collection('stats').doc('global').get();
    res.status(200).json(statsDoc.data() || { rolloverAmount: 0 });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
