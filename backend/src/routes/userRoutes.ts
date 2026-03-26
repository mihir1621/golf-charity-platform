import { Router } from 'express';
import { getProfile, updateProfile } from '../controllers/userController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();

// /api/user/profile
router.get('/profile', requireAuth, getProfile);

// /api/user/update
router.put('/update', requireAuth, updateProfile);

export default router;
