import { Router } from 'express';
import { signup, socialSync } from '../controllers/authController.js';
const router = Router();
// /api/auth/signup
router.post('/signup', signup);
// /api/auth/social-sync
router.post('/social-sync', socialSync);
export default router;
//# sourceMappingURL=authRoutes.js.map