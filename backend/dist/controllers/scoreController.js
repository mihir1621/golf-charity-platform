import { db } from '../config/firebase.js';
export const addScore = async (req, res) => {
    try {
        const uid = req.user?.uid;
        const { value, date, courseName } = req.body;
        if (value < 1 || value > 45) {
            res.status(400).json({ error: 'Score value must be between 1 and 45' });
            return;
        }
        const scoresRef = db.collection('scores');
        const newScore = {
            userId: uid,
            value,
            courseName: courseName || 'Unknown Course',
            date: new Date(date),
            createdAt: new Date()
        };
        await scoresRef.add(newScore);
        // Fetch user's current scores
        const userScoresSnapshot = await scoresRef
            .where('userId', '==', uid)
            .get();
        // Sort in memory to avoid index requirement
        let scoreDocs = [...userScoresSnapshot.docs];
        scoreDocs.sort((a, b) => {
            const dateA = a.data().date?._seconds ? a.data().date._seconds : new Date(a.data().date).getTime();
            const dateB = b.data().date?._seconds ? b.data().date._seconds : new Date(b.data().date).getTime();
            return dateA - dateB;
        });
        // If more than 5 scores, delete the oldest
        if (scoreDocs.length > 5) {
            const deleteCount = scoreDocs.length - 5;
            const docsToDelete = scoreDocs.slice(0, deleteCount);
            const batch = db.batch();
            docsToDelete.forEach(doc => {
                batch.delete(doc.ref);
            });
            await batch.commit();
        }
        res.status(201).json({ message: 'Score added successfully' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const getScores = async (req, res) => {
    try {
        const uid = req.user?.uid;
        // Fetch scores for user
        const scoresSnapshot = await db.collection('scores')
            .where('userId', '==', uid)
            .get();
        let scores = scoresSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        // In-memory sort
        scores.sort((a, b) => {
            const dateA = a.date?._seconds ? a.date._seconds : new Date(a.date).getTime();
            const dateB = b.date?._seconds ? b.date._seconds : new Date(b.date).getTime();
            return dateB - dateA;
        });
        res.status(200).json(scores);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const getLeaderboard = async (_req, res) => {
    try {
        const scoresSnapshot = await db.collection('scores').get();
        const userTotals = {};
        // Group and sum
        scoresSnapshot.docs.forEach(doc => {
            const data = doc.data();
            const uid = data.userId;
            if (!userTotals[uid]) {
                userTotals[uid] = { totalPoints: 0, rounds: 0 };
            }
            userTotals[uid].totalPoints += data.value || 0;
            userTotals[uid].rounds += 1;
        });
        // Fetch user profiles to get display names
        const leaderboard = await Promise.all(Object.entries(userTotals).map(async ([uid, stats]) => {
            const userDoc = await db.collection('users').doc(uid).get();
            const userData = userDoc.data();
            return {
                userId: uid,
                name: userData?.displayName || 'Anonymous Player',
                club: userData?.clubName || 'Local Club',
                avatar: userData?.photoURL || `https://i.pravatar.cc/80?u=${uid}`,
                totalPoints: stats.totalPoints,
                rounds: stats.rounds,
                avgScore: stats.rounds > 0 ? (stats.totalPoints / stats.rounds).toFixed(1) : 0
            };
        }));
        // Sort by points desc
        leaderboard.sort((a, b) => b.totalPoints - a.totalPoints);
        res.status(200).json(leaderboard);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
//# sourceMappingURL=scoreController.js.map