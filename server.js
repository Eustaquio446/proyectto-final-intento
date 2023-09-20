import express, { json } from "express";
import mongoose from "mongoose";
import userRouter from "./rutas/user.rutas.js";
import albumRouter from "./rutas/album.rutas.js";
import dotenv from "dotenv";
import path from "path";

const app = express();
dotenv.config();
const port = process.env.PORT;
const url = process.env.URL;

// Ruta de Health Check
app.use("/health", (req, res) => res.sendStatus(200));
app.use('/', routes);

app.use(json());
app.use(express.static(path.join("public")));
app.use("/user", userRouter);
app.use("/band", albumRouter);

async function connectToMongo() {
    try {
        await mongoose.connect(url);
        app.listen(3000, () => {
            console.log('Servidor escuchando en puerto 3000 y Base de Datos conectada');
        });
    } catch (error) {
        console.log(error);
    }
}

connectToMongo();
