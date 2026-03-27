import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// Route imports
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import scoreRoutes from './routes/scoreRoutes.js';
import drawRoutes from './routes/drawRoutes.js';
import charityRoutes from './routes/charityRoutes.js';
import subscriptionRoutes from './routes/subscriptionRoutes.js';
import winnerRoutes from './routes/winnerRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import perkRoutes from './routes/perkRoutes.js';
dotenv.config();
const app = express();
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl)
        if (!origin)
            return callback(null, true);
        const allowedOrigins = [
            FRONTEND_URL,
            'http://localhost:5173',
            'https://golf-charity-platform-frontend.vercel.app'
        ];
        const isAllowed = allowedOrigins.includes(origin) ||
            origin.endsWith('.vercel.app') ||
            origin.includes('localhost');
        if (isAllowed) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
// Webhook route - must be before express.json() to get raw body
app.use('/api/webhook/stripe', express.raw({ type: 'application/json' }), subscriptionRoutes);
// General middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);
app.use('/api/scores', scoreRoutes);
app.use('/api/draw', drawRoutes);
app.use('/api/charities', charityRoutes);
app.use('/api/subscribe', subscriptionRoutes);
app.use('/api/winner', winnerRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/perks', perkRoutes);
// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', timestamp: new Date() });
});
export default app;
//# sourceMappingURL=app.js.map