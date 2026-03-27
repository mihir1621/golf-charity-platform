import type { Response } from 'express';
import type { AuthRequest } from '../middleware/authMiddleware.js';
export declare const runDraw: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getResults: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getDrawHistory: (_req: AuthRequest, res: Response) => Promise<void>;
export declare const getLatestDraw: (_req: AuthRequest, res: Response) => Promise<void>;
export declare const getGlobalStats: (_req: AuthRequest, res: Response) => Promise<void>;
//# sourceMappingURL=drawController.d.ts.map