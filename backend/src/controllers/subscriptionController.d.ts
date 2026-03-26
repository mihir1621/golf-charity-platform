import type { Request, Response } from 'express';
import type { AuthRequest } from '../middleware/authMiddleware.js';
export declare const createSubscription: (req: AuthRequest, res: Response) => Promise<void>;
export declare const handleStripeWebhook: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=subscriptionController.d.ts.map