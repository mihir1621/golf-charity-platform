import { Router } from 'express';
import { runDraw, getResults } from '../controllers/drawController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();

// /api/draw/run (admin triggered)
router.post('/run', requireAuth, runDraw);

// /api/draw/results
router.get('/results', requireAuth, getResults);

export default router;
