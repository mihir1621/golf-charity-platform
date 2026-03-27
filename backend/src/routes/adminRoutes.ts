import { Router } from 'express';
import { getAdminStats, getAllWinners } from '../controllers/adminController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();

// /api/admin/stats
router.get('/stats', requireAuth, getAdminStats);

// /api/admin/winners
router.get('/winners', requireAuth, getAllWinners);

export default router;
