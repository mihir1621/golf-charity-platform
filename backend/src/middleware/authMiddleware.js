import { auth } from '../config/firebase.js';
export const requireAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
            return;
        }
        const token = authHeader.split('Bearer ')[1];
        if (!token) {
            res.status(401).json({ error: 'Unauthorized: Token missing' });
            return;
        }
        // Verify the Firebase ID token
        const decodedToken = await auth.verifyIdToken(token);
        req.user = {
            uid: decodedToken.uid,
            email: decodedToken.email
        };
        next();
    }
    catch (error) {
        console.error('Authentication error:', error);
        res.status(401).json({ error: 'Unauthorized: Invalid token' });
        return;
    }
};
//# sourceMappingURL=authMiddleware.js.map