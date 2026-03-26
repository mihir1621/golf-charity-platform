# 🏌️‍♂️ Platform Setup Guide

To get the **Golf Charity Subscription Platform** running with real data, you need to sync it with your own **Firebase** and **Stripe** accounts. Follow these steps to generate and update your keys.

---

## 🏗️ 1. Firebase Configuration

Firebase handles both your **Database (Firestore)** and **Authentication**. You need two different types of keys: client-side for the frontend and a service account for the backend.

### A. Get Frontend Config (for `frontend/.env`)
1.  Go to the [Firebase Console](https://console.firebase.google.com/).
2.  Click **"Add project"** and follow the setup.
3.  Once the project is ready, click the **Web icon (</>)** to register an app.
4.  Copy the `firebaseConfig` object values and paste them into `frontend/.env`.

### B. Get Backend Service Account (for `backend/.env`)
1.  In your Firebase Console, click the **Settings Cog (⚙️)** > **Project Settings**.
2.  Navigate to the **Service Accounts** tab.
3.  Click **"Generate new private key"**. This will download a `.json` file.
4.  Open that file, copy the entire JSON content, and paste it *into a single line* in `backend/.env` under `FIREBASE_SERVICE_ACCOUNT_KEY`.

---

## 💳 2. Stripe Configuration

Stripe handles the monthly and yearly subscriptions.

### A. Get API Keys
1.  Log in to your [Stripe Dashboard](https://dashboard.stripe.com/).
2.  Enable **"Test Mode"** (toggle in the top right).
3.  Go to **Developers** > **API Keys**.
4.  Copy the **Publishable key** into `frontend/.env` (`VITE_STRIPE_PUBLIC_KEY`).
5.  Copy the **Secret key** into `backend/.env` (`STRIPE_SECRET_KEY`).

### B. Create Subscription Products
1.  Go to **Products** > **Add Product**.
2.  Create a **Monthly Plan** (e.g., $9.99/mo) and a **Yearly Plan** (e.g., $99/yr).
3.  Copy the **Price IDs** (starting with `price_...`) for both and paste them into `backend/.env`.

---

## 🚀 3. Starting the Platform

Once the keys are in place, open **two separate terminals**:

### Terminal 1: Backend
```powershell
cd backend
npm install
npm run build
npm run start
```

### Terminal 2: Frontend
```powershell
cd frontend
npm install
npm run dev
```

> [!TIP]
> **Important Note:** You tried to run `npm run dev` in the root folder. The project is split into two independent folders. You **must** enter either the `frontend` or `backend` folder before running any commands.
