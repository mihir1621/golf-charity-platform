import type { Request, Response } from 'express';
import { db } from '../config/firebase.js';

export const getPerks = async (req: Request, res: Response): Promise<void> => {
  try {
    const perksSnapshot = await db.collection('perks')
      .where('active', '==', true)
      .get();

    if (perksSnapshot.empty) {
      // Return default/static perks if database is not populated yet
      res.status(200).json([
        {
          id: '1',
          title: 'Custom Fitting',
          image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?q=80&w=600&auto=format&fit=crop',
          description: 'Complimentary professional club fitting session at any partner location nationwide.',
          cta: 'Book Session',
          category: 'Pro Shop',
          active: true,
        },
        {
          id: '2',
          title: 'Private Air Credit',
          image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=600&auto=format&fit=crop',
          description: '$500 credit toward your first private charter through NetJets partnership.',
          cta: 'Claim Credit',
          category: 'Travel',
          active: true,
        },
        {
          id: '3',
          title: 'Concierge Dining',
          image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=600&auto=format&fit=crop',
          description: 'Priority table bookings and complimentary aperitifs at Michelin-star restaurants.',
          cta: 'Request Table',
          category: 'Events',
          active: true,
        }
      ]);
      return;
    }
      
    const perks = perksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(perks);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createPerk = async (req: Request, res: Response): Promise<void> => {
  try {
    const perkData = req.body;
    const docRef = await db.collection('perks').add({
       ...perkData,
       active: true,
       createdAt: new Date()
    });
    res.status(201).json({ id: docRef.id, message: 'Perk created' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
