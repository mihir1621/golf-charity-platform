# Firestore Database Schema

This document outlines the Firestore collections, document structures, and relationships for the Golf Charity Subscription Platform. All collections are normalized to support the required features such as score tracking, draws, charity contributions, and Stripe subscriptions.

## Collections

### 1. `users`
**Purpose**: Store core user profiles and metadata. Includes Firebase Auth UID as the document ID.
```typescript
interface User {
  uid: string; // Document ID (Match with Firebase Auth UID)
  email: string;
  displayName: string;
  charityId: string; // Reference to selected charity
  charityContributionPercent: number; // Minimum 10
  subscriptionStatus: 'active' | 'expired' | 'cancelled'; // Current status
  stripeCustomerId: string;
  role: 'user' | 'admin';
  createdAt: timestamp;
  updatedAt: timestamp;
}
```

### 2. `subscriptions`
**Purpose**: Keep detailed subscription records linked to Stripe webhooks.
```typescript
interface Subscription {
  id: string; // Document ID
  userId: string; // Reference to 'users' collection
  stripeSubscriptionId: string;
  planType: 'monthly' | 'yearly';
  status: 'active' | 'past_due' | 'canceled' | 'unpaid';
  currentPeriodStart: timestamp;
  currentPeriodEnd: timestamp;
  cancelAtPeriodEnd: boolean;
  createdAt: timestamp;
  updatedAt: timestamp;
}
```

### 3. `scores`
**Purpose**: Track users' golf scores (Stableford format). The system will maintain a maximum of 5 scores per user.
```typescript
interface Score {
  id: string; // Document ID
  userId: string; // Reference to 'users' collection
  value: number; // 1-45 (Stableford score)
  date: timestamp; // Date the score was recorded
  createdAt: timestamp;
}
```
*Note: A Cloud Function or backend logic will automatically trim scores for a `userId` to the most recent 5 entries upon insertion.*

### 4. `draws`
**Purpose**: Log each monthly or admin-triggered draw event.
```typescript
interface Draw {
  id: string; // Document ID
  monthYear: string; // e.g., "03-2024"
  status: 'pending' | 'simulated' | 'completed';
  totalPrizePool: number;
  jackpotRolledOver: number; // Amount carried from previous month if no 5-match winner
  winningNumbers: number[]; // Array of selected numbers/scores
  executedAt: timestamp | null;
  createdAt: timestamp;
}
```

### 5. `results`
**Purpose**: Store outcomes of draws, detailing who won and from what match tier.
```typescript
interface Result {
  id: string; // Document ID
  drawId: string; // Reference to 'draws' collection
  userId: string; // Reference to 'users'
  matchTier: '5-match' | '4-match' | '3-match';
  prizeAmount: number;
  paymentStatus: 'pending' | 'paid';
  createdAt: timestamp;
}
```

### 6. `charities`
**Purpose**: Manage selectable charities.
```typescript
interface Charity {
  id: string; // Document ID
  name: string;
  description: string;
  logoUrl: string;
  totalRaised: number; // Aggregated value calculated on backend
  isActive: boolean;
  isFeatured: boolean;
  createdAt: timestamp;
  updatedAt: timestamp;
}
```

### 7. `payments`
**Purpose**: Detailed logs for platform payouts to winners or charities.
```typescript
interface Payment {
  id: string; // Document ID
  type: 'prize' | 'charity';
  destinationId: string; // userId or charityId
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  processedAt: timestamp;
  createdAt: timestamp;
}
```

### 8. `winnerProofs`
**Purpose**: Verification logic for winners to upload proof (image) before payouts are processed.
```typescript
interface WinnerProof {
  id: string; // Document ID
  userId: string; // Reference to 'users'
  resultId: string; // Reference to 'results'
  imageUrl: string; // Storage URL
  status: 'pending' | 'approved' | 'rejected';
  adminNotes?: string;
  submittedAt: timestamp;
  reviewedAt?: timestamp;
}
```
