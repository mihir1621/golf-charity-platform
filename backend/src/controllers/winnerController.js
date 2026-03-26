import { db } from '../config/firebase.js';
export const uploadWinnerProof = async (req, res) => {
    try {
        const uid = req.user?.uid;
        const { resultId, imageUrl } = req.body;
        if (!resultId || !imageUrl) {
            res.status(400).json({ error: 'Missing required parameters' });
            return;
        }
        const proofData = {
            userId: uid,
            resultId,
            imageUrl,
            status: 'pending',
            submittedAt: new Date()
        };
        const docRef = await db.collection('winnerProofs').add(proofData);
        res.status(201).json({ message: 'Proof submitted', id: docRef.id });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const verifyWinnerProof = async (req, res) => {
    try {
        const uid = req.user?.uid;
        const userDoc = await db.collection('users').doc(uid).get();
        if (userDoc.data()?.role !== 'admin') {
            res.status(403).json({ error: 'Forbidden' });
            return;
        }
        const { proofId, status, adminNotes } = req.body; // status: 'approved' or 'rejected'
        if (status !== 'approved' && status !== 'rejected') {
            res.status(400).json({ error: 'Invalid status' });
            return;
        }
        await db.collection('winnerProofs').doc(proofId).update({
            status,
            adminNotes: adminNotes || null,
            reviewedAt: new Date()
        });
        if (status === 'approved') {
            // Find the proof and verify the payment
            const proofDoc = await db.collection('winnerProofs').doc(proofId).get();
            const resultId = proofDoc.data()?.resultId;
            if (resultId) {
                // Mark the result payment as paid
                await db.collection('results').doc(resultId).update({
                    paymentStatus: 'paid'
                });
                // In a real app we might trigger a stripe transfer or bank payout here
            }
        }
        res.status(200).json({ message: `Proof marked as ${status}` });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
//# sourceMappingURL=winnerController.js.map