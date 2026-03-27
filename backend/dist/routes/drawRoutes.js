import { Router } from 'express';
import { runDraw, getResults, getDrawHistory, getLatestDraw, getGlobalStats } from '../controllers/drawController.js';
import { requireAuth } from '../middleware/authMiddleware.js';
const router = Router();
router.post('/run', requireAuth, runDraw);
router.get('/results', requireAuth, getResults);
router.get('/history', requireAuth, getDrawHistory);
router.get('/latest', requireAuth, getLatestDraw);
router.get('/stats', requireAuth, getGlobalStats);
export default router;
//# sourceMappingURL=drawRoutes.js.map