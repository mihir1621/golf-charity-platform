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