import { Router } from 'express';
import { runDraw, getResults, getDrawHistory } from '../controllers/drawController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();

// /api/draw/run (admin triggered)
router.post('/run', requireAuth, runDraw);

// /api/draw/results
router.get('/results', requireAuth, getResults);

// /api/draw/history (global community view)
router.get('/history', requireAuth, getDrawHistory);

export default router;
