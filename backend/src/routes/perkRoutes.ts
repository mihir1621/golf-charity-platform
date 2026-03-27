import { Router } from 'express';
import { getPerks, createPerk } from '../controllers/perkController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', requireAuth, getPerks);
router.post('/', requireAuth, createPerk); // Needs admin protection later but good for setup

export default router;
