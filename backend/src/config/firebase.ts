import { initializeApp, cert, getApps, getApp, type App } from 'firebase-admin/app';
import { getFirestore, type Firestore } from 'firebase-admin/firestore';
import { getAuth, type Auth } from 'firebase-admin/auth';
import dotenv from 'dotenv';

dotenv.config();

const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

let app: App;

const apps = getApps() || [];

if (apps.length === 0) {
  if (serviceAccountKey) {
    const serviceAccount = JSON.parse(serviceAccountKey);
    app = initializeApp({
      credential: cert(serviceAccount)
    });
  } else {
    app = initializeApp();
  }
} else {
  app = getApp();
}

export const db: Firestore = getFirestore(app);
export const auth: Auth = getAuth(app);
export default app;
