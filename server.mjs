import express from 'express';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import path from 'path';

import authRoutes from './src/routes/auth.mjs';
import dbConfig from './src/serverConfig/dbConfig.mjs';
import productsRoutes from './src/routes/products.mjs';
import updateCartRouter from './src/routes/updateCart.mjs';

import User from './src/models/User.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5005;

//Engedélyezd a CORS-t az összes klienstől érkező kérésre
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(dbConfig.mongoURIsharpSystem).then(() => {
    console.log('Sikeresen csatlakozva az adatbázishoz.');
}).catch((err) => {
    console.error('Hiba történt az adatbázishoz való csatlakozás közben:', err);
});

// Példa a szöveges adat lekérésére a MongoDB-ből
app.get('/get-text', async (req, res) => {
    try {
        // MongoDB-ből történő lekérés példakódja
        const textData = await Text.findOne({}); // TextModel a MongoDB modellje

        // A kliensnek visszaküldjük az adatokat JSON formátumban
        res.json({ textData }); // Feltételezzük, hogy a szöveges adat "text" mezőben van
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/* const user = await User.findOne({ email: "albi@gmail.com" });
app.get('/db', (req, res) => {
    res.send(user);
}); */


app.use('/auth', authRoutes);
app.use('/products', productsRoutes);
app.use('/update-cart', updateCartRouter);

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`A szerver fut a ${PORT}-es porton.`);
});