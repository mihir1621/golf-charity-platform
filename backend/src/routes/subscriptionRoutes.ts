import { Router } from 'express';
import { createSubscription, handleStripeWebhook } from '../controllers/subscriptionController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();

// /api/subscribe
router.post('/checkout', requireAuth, createSubscription);

// Webhook listener - this will be /api/webhook/stripe/callback
// ensure app.ts mounts it to /api/webhook/stripe
router.post('/callback', handleStripeWebhook);

export default router;
