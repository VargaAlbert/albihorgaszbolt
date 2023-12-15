import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.mjs';
import ShopCard from '../models/ShopCard.mjs';
import tokenKey from '../serverConfig/tokenKey.mjs';

const router = express.Router();

// Regisztráció
router.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, password, email, phone } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ email });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ firstName, lastName, email, phone, password: hashedPassword });
        await user.save();

        // A shopCard rekord létrehozása
        const shopCard = new ShopCard({
            userId: user._id,
        });
        await shopCard.save();

        res.status(201).send('Regisztráció sikeres!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Hiba történt a regisztráció közben.');
    }
});

// Bejelentkezés
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).send('Felhasználó nem található!');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).send('Hibás jelszó!');
        }

        const userWithName = {
            ...user.toObject(),
            firstName: user.firstName,
            lastName: user.lastName
        };

        const token = jwt.sign({ userId: user._id }, tokenKey.key);

        //megkeresés a felhasználóhoz tartozó kosár
        const shopCard = await ShopCard.findOne({ userId: user._id }, { items: 1, _id: 0 });


        res.status(200).json({
            token,
            user: userWithName,
            shopCard: shopCard ? shopCard.items : []
        });



    } catch (error) {
        console.error(error);
        res.status(500).send('Hiba történt a bejelentkezés közben.');
    }
});

export default router;
