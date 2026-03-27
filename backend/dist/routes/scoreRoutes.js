import { Router } from 'express';
import { addScore, getScores, getLeaderboard } from '../controllers/scoreController.js';
import { requireAuth } from '../middleware/authMiddleware.js';
const router = Router();
// /api/scores
router.post('/', requireAuth, addScore);
router.get('/', requireAuth, getScores);
router.get('/leaderboard', getLeaderboard);
export default router;
//# sourceMappingURL=scoreRoutes.js.map