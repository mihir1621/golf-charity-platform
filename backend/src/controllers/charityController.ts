import type { Request, Response } from 'express';
import { db } from '../config/firebase.js';
import type { AuthRequest } from '../middleware/authMiddleware.js';

export const getCharities = async (req: Request, res: Response): Promise<void> => {
  try {
    const charitiesSnapshot = await db.collection('charities').get();
    const charities = charitiesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    res.status(200).json(charities);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createCharity = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const uid = req.user?.uid;
    const userDoc = await db.collection('users').doc(uid!).get();
    
    if (userDoc.data()?.role !== 'admin') {
      res.status(403).json({ error: 'Forbidden' });
      return;
    }

    const { name, description, logoUrl, isFeatured } = req.body;

    const charityData = {
      name,
      description,
      logoUrl,
      totalRaised: 0,
      isActive: true,
      isFeatured: isFeatured || false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const docRef = await db.collection('charities').add(charityData);
    res.status(201).json({ message: 'Charity created', id: docRef.id });

  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
