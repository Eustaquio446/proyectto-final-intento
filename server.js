import express, { json } from "express";
import mongoose from "mongoose";
import userRouter from "./rutas/user.rutas.js";
import albumRouter from "./rutas/album.rutas.js";
import dotenv from "dotenv"
const app = express()
dotenv.config()
const port = process.env.PORT
const url = process.env.URL 
import path from "path"; 

app.use("/health", (req, res) => res.sendStatus(200));
app.use('/', routes)
app.use(json())
app.use(express.static(path.join("public"))); 
app.use("/user", userRouter);
app.use("/band", albumRouter);

async function connectToMongo(){
    try{
        await mongoose.connect(url) 
        app.listen(3000, ()=>{ 
            console.log('Servidor escuchando en puerto 3000 y Basde de Datos conectada')
          }) 
    }catch(error){
        console.log(error)
    }
}

connectToMongo()
