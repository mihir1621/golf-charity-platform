import type { Response } from 'express';
import { db } from '../config/firebase.js';
import type { AuthRequest } from '../middleware/authMiddleware.js';

export const addScore = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const uid = req.user?.uid;
    const { value, date } = req.body;

    if (value < 1 || value > 45) {
      res.status(400).json({ error: 'Score value must be between 1 and 45' });
      return;
    }

    const scoresRef = db.collection('scores');
    const newScore = {
      userId: uid,
      value,
      date: new Date(date),
      createdAt: new Date()
    };

    await scoresRef.add(newScore);

    // Fetch user's current scores, sorted by date asc (oldest first)
    const userScoresSnapshot = await scoresRef
      .where('userId', '==', uid)
      .orderBy('date', 'asc')
      .get();

    // If more than 5 scores, delete the oldest
    if (userScoresSnapshot.size > 5) {
      const deleteCount = userScoresSnapshot.size - 5;
      const docsToDelete = userScoresSnapshot.docs.slice(0, deleteCount);
      
      const batch = db.batch();
      docsToDelete.forEach(doc => {
        batch.delete(doc.ref);
      });
      await batch.commit();
    }

    res.status(201).json({ message: 'Score added successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getScores = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const uid = req.user?.uid;
    
    // Sort descending by date
    const scoresSnapshot = await db.collection('scores')
      .where('userId', '==', uid)
      .orderBy('date', 'desc')
      .get();

    const scores = scoresSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    res.status(200).json(scores);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
