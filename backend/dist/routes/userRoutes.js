import { Router } from 'express';
import { getProfile, updateProfile, getInvoices, updateCharity } from '../controllers/userController.js';
import { requireAuth } from '../middleware/authMiddleware.js';
const router = Router();
// /api/user/profile
router.get('/profile', requireAuth, getProfile);
router.get('/invoices', requireAuth, getInvoices);
// /api/user/update
router.put('/update', requireAuth, updateProfile);
router.post('/update-charity', requireAuth, updateCharity);
export default router;
//# sourceMappingURL=userRoutes.js.map