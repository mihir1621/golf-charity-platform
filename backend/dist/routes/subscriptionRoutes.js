import { Router } from 'express';
import { createSubscription, handleStripeWebhook } from '../controllers/subscriptionController.js';
import { requireAuth } from '../middleware/authMiddleware.js';
const router = Router();
// /api/subscribe
router.post('/', requireAuth, createSubscription);
// /api/webhook/stripe - Note: this route is mounted earlier in app.ts 
// so it doesn't get the JSON parser middleware (Stripe validation requires raw body)
// However, the router is shared. We handle it in app.ts specifically like:
// app.use('/api/webhook/stripe', express.raw({ type: 'application/json' }), subscriptionRoutes);
router.post('/', handleStripeWebhook);
export default router;
//# sourceMappingURL=subscriptionRoutes.js.map