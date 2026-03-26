import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config();
const stripeSecretKey = process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder';
export const stripe = new Stripe(stripeSecretKey, {
    apiVersion: '2026-03-25.dahlia',
});
export default stripe;
//# sourceMappingURL=stripe.js.map