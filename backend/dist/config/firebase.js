import { initializeApp, cert, getApps, getApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import dotenv from 'dotenv';
dotenv.config();
const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
let app;
const apps = getApps() || [];
if (apps.length === 0) {
    if (serviceAccountKey) {
        const serviceAccount = JSON.parse(serviceAccountKey);
        app = initializeApp({
            credential: cert(serviceAccount)
        });
    }
    else {
        app = initializeApp();
    }
}
else {
    app = getApp();
}
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
//# sourceMappingURL=firebase.js.map