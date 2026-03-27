import { db } from '../config/firebase.js';
export const getCharities = async (req, res) => {
    try {
        const charitiesSnapshot = await db.collection('charities').get();
        const charities = charitiesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(charities);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const getFeaturedCharity = async (req, res) => {
    try {
        const charitySnapshot = await db.collection('charities')
            .where('isActive', '==', true)
            .where('isFeatured', '==', true)
            .limit(1)
            .get();
        if (charitySnapshot.empty) {
            res.status(404).json({ error: 'No featured charity found.' });
            return;
        }
        res.status(200).json({ id: charitySnapshot.docs[0]?.id, ...charitySnapshot.docs[0]?.data() });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const donateToCharity = async (req, res) => {
    try {
        const uid = req.user?.uid;
        const { amount, charityId } = req.body;
        if (!amount || amount <= 0) {
            res.status(400).json({ error: 'Invalid donation amount.' });
            return;
        }
        const charityRef = db.collection('charities').doc(charityId);
        const charityDoc = await charityRef.get();
        if (!charityDoc.exists) {
            res.status(404).json({ error: 'Charity not found.' });
            return;
        }
        await charityRef.update({
            totalRaised: (charityDoc.data()?.totalRaised || 0) + amount,
            updatedAt: new Date()
        });
        await db.collection('impact').add({
            userId: uid,
            charityId,
            charityName: charityDoc.data()?.name,
            amount,
            type: 'independent',
            status: 'completed',
            date: new Date(),
            createdAt: new Date()
        });
        res.status(200).json({ message: 'Donation successful! Thank you for your impact.' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const createCharity = async (req, res) => {
    try {
        const uid = req.user?.uid;
        const userDoc = await db.collection('users').doc(uid).get();
        if (userDoc.data()?.role !== 'admin') {
            res.status(403).json({ error: 'Forbidden' });
            return;
        }
        const { name, description, logoUrl, isFeatured } = req.body;
        const charityData = {
            name,
            description,
            logoUrl,
            totalRaised: 0,
            isActive: true,
            isFeatured: isFeatured || false,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        const docRef = await db.collection('charities').add(charityData);
        res.status(201).json({ message: 'Charity created', id: docRef.id });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
//# sourceMappingURL=charityController.js.map