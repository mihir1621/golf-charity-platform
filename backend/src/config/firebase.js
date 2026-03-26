import * as admin from 'firebase-admin';
import dotenv from 'dotenv';
dotenv.config();
// Initialize Firebase Admin with credentials securely stored in environment variables
// Ensure GOOGLE_APPLICATION_CREDENTIALS points to the service account JSON
// or parse it from an env var string if hosted on Vercel
const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
if (!admin.apps.length) {
    if (serviceAccountKey) {
        const serviceAccount = JSON.parse(serviceAccountKey);
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
    }
    else {
        // Fallback to application default credentials
        admin.initializeApp();
    }
}
export const db = admin.firestore();
export const auth = admin.auth();
export default admin;
//# sourceMappingURL=firebase.js.map