import type { Response } from 'express';
import { db } from '../config/firebase.js';
import type { AuthRequest } from '../middleware/authMiddleware.js';

export const getNotifications = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const uid = req.user?.uid;
    const notificationsSnapshot = await db.collection('notifications')
      .where('userId', '==', uid)
      .orderBy('createdAt', 'desc')
      .limit(50)
      .get();
      
    const notifications = notificationsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(notifications);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const markAsRead = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { notificationId } = req.params;
    const uid = req.user?.uid;

    const notifRef = db.collection('notifications').doc(notificationId);
    const notifDoc = await notifRef.get();

    if (!notifDoc.exists || notifDoc.data()?.userId !== uid) {
       res.status(404).json({ error: 'Notification not found' });
       return;
    }

    await notifRef.update({ unread: false });
    res.status(200).json({ message: 'Marked as read' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const markAllAsRead = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const uid = req.user?.uid;
    const unreadSnapshot = await db.collection('notifications')
      .where('userId', '==', uid)
      .where('unread', '==', true)
      .get();

    if (unreadSnapshot.empty) {
      res.status(200).json({ message: 'No unread notifications' });
      return;
    }

    const batch = db.batch();
    unreadSnapshot.docs.forEach(doc => {
      batch.update(doc.ref, { unread: false });
    });
    await batch.commit();

    res.status(200).json({ message: 'All marked as read' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Helper function to create notification (for internal use)
export const createNotification = async (userId: string, type: string, title: string, description: string, metadata: any = {}) => {
  try {
    await db.collection('notifications').add({
      userId,
      type,
      title,
      description,
      unread: true,
      metadata,
      createdAt: new Date()
    });
  } catch (err) {
    console.error('Failed to create notification:', err);
  }
};
