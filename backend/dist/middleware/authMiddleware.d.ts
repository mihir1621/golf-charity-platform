import type { Request, Response, NextFunction } from 'express';
export interface AuthRequest extends Request {
    user?: {
        uid: string;
        email?: string | undefined;
    };
}
export declare const requireAuth: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=authMiddleware.d.ts.map