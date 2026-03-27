import { Router } from 'express';
import { getCharities, createCharity, getFeaturedCharity, donateToCharity } from '../controllers/charityController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();

// Public routes
router.get('/', getCharities);
router.get('/featured', getFeaturedCharity);

// Protected routes
router.post('/donate', requireAuth, donateToCharity);

// Admin-protected routes (Auth checked in controller too)
router.post('/', requireAuth, createCharity);

export default router;
