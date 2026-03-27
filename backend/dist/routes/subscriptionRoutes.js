import { Router } from 'express';
import { createSubscription, handleStripeWebhook, verifySession, createPortalSession, getReceipt } from '../controllers/subscriptionController.js';
import { requireAuth } from '../middleware/authMiddleware.js';
const router = Router();
// /api/subscribe
router.post('/checkout', requireAuth, createSubscription);
router.get('/verify', requireAuth, verifySession);
router.post('/portal', requireAuth, createPortalSession);
router.get('/receipt', requireAuth, getReceipt);
// Webhook listener - this will be /api/webhook/stripe/callback
// ensure app.ts mounts it to /api/webhook/stripe
router.post('/callback', handleStripeWebhook);
export default router;
//# sourceMappingURL=subscriptionRoutes.js.map