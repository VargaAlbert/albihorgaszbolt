import express from "express";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import path, { dirname, join } from "path";

import dbConfig from "./src/serverConfig/dbConfig.mjs";
import authRoutes from "./src/routes/auth.mjs";
import productsRoutes from "./src/routes/products.mjs";
import updateCartRouter from "./src/routes/updateCart.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5005;

//Engedélyezd a CORS-t az összes klienstől érkező kérésre
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.use(express.urlencoded({ extended: true }));// Express alkalmazást képes legyen értelmezni az URL-kódolt adatokat a HTTP POST kérésekben.
app.use(express.json()); //Express alkalmazást képes legyen értelmezni a JSON formátumú adatokat a HTTP POST kérésekben. 

mongoose.connect(dbConfig.mongoTEST).then(() => {
    console.log("Sikeresen csatlakozva az adatbázishoz.");
}).catch((err) => {
    console.error("Hiba történt az adatbázishoz való csatlakozás közben:", err);
});

app.use("/auth", authRoutes);
app.use("/products", productsRoutes);
app.use("/update-cart", updateCartRouter);

app.use(express.static(path.join(__dirname, "client/build")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

app.listen(PORT, () => {
    console.log(`A szerver fut a ${PORT}-es porton.`);
});