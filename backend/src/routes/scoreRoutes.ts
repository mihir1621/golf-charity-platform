import { Router } from 'express';
import { addScore, getScores } from '../controllers/scoreController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();

// /api/scores
router.post('/', requireAuth, addScore);
router.get('/', requireAuth, getScores);

export default router;
