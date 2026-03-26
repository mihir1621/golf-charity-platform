import { Router } from 'express';
import { signup, login } from '../controllers/authController.js';
const router = Router();
// /api/auth/signup
router.post('/signup', signup);
// /api/auth/login
router.post('/login', login);
export default router;
//# sourceMappingURL=authRoutes.js.map