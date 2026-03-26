import { Router } from 'express';
import { getCharities, createCharity } from '../controllers/charityController.js';
import { requireAuth } from '../middleware/authMiddleware.js';
const router = Router();
// /api/charities
router.get('/', getCharities); // public or authenticated access depending on requirement
// /api/charities (admin)
router.post('/', requireAuth, createCharity);
export default router;
//# sourceMappingURL=charityRoutes.js.map