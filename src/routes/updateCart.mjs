import express from 'express';
import ShopCard from '../models/ShopCard.mjs';
import User from '../models/User.mjs';
import jwt from 'jsonwebtoken';
import tokenKey from '../serverConfig/tokenKey.mjs';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { token, cartItems } = req.body;

        // Felhasználó azonosítója
        const userId = await getUserIdFromToken(token); // Tokenből azonosító kinyerése

        // Törlés az előző 'items' tartalmat az adatbázisból és frissítjük az újjal.
        await ShopCard.findOneAndUpdate(
            { userId },
            { $set: { items: cartItems } },
            { upsert: true }
        );

        res.status(200).send('A kosár frissítése sikeres volt.');
    } catch (error) {
        console.error('Hiba történt a kosár frissítése során:', error);
        res.status(500).send('Hiba történt a kosár frissítése során.');
    }
});

async function getUserIdFromToken(token) {
    try {
        const decoded = jwt.verify(token, tokenKey.key);

        const userId = decoded.userId;

        const user = await User.findOne({ _id: userId });

        if (!user) {
            throw new Error('A felhasználó nem található');
        }

        return user._id;
    } catch (error) {
        console.error('Hiba történt a token visszafejtésekor:', error);
        throw error;
    }
}

export default router;
