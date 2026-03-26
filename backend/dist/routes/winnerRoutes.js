import { Router } from 'express';
import { uploadWinnerProof, verifyWinnerProof } from '../controllers/winnerController.js';
import { requireAuth } from '../middleware/authMiddleware.js';
const router = Router();
// /api/winner/proof
router.post('/proof', requireAuth, uploadWinnerProof);
// /api/winner/verify
router.put('/verify', requireAuth, verifyWinnerProof);
export default router;
//# sourceMappingURL=winnerRoutes.js.map