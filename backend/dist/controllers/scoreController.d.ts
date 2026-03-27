import type { Response } from 'express';
import type { AuthRequest } from '../middleware/authMiddleware.js';
export declare const addScore: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getScores: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getLeaderboard: (_req: AuthRequest, res: Response) => Promise<void>;
//# sourceMappingURL=scoreController.d.ts.map