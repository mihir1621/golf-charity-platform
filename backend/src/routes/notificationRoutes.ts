import { Router } from 'express';
import { getNotifications, markAsRead, markAllAsRead } from '../controllers/notificationController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', requireAuth, getNotifications);
router.patch('/:notificationId/read', requireAuth, markAsRead);
router.post('/read-all', requireAuth, markAllAsRead);

export default router;
