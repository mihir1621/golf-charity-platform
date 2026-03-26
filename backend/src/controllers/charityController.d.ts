import type { Request, Response } from 'express';
import type { AuthRequest } from '../middleware/authMiddleware.js';
export declare const getCharities: (req: Request, res: Response) => Promise<void>;
export declare const createCharity: (req: AuthRequest, res: Response) => Promise<void>;
//# sourceMappingURL=charityController.d.ts.map