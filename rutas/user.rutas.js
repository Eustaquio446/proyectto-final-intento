import { Router } from "express";
import userModel from "../models/user.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const users = await userModel.find();
    res.json({ status: "success", data: users });
  } catch (error) {
    console.log("No se pudo obtener los usuarios: " + error);
  }
});

router.post("/", async (req, res) => {
  const { nombre, apellido, contraseña, email } = req.body;
  if (!nombre || !apellido || !contraseña || !email) {
    return res.json({ status: "error", error: "Datos faltantes" });
  }
  try {
    const saltRounds = 10;
    const hash = await bcrypt.hash(contraseña, saltRounds);
    const user = await userModel.create({
      nombre,
      apellido,
      contraseña: hash,
      email,
    });
    res.status(201).json({ status: "success", data: user });
  } catch (error) {
    console.log("No se pudo cargar el usuario: " + error);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.findById(id);
    if (user) {
      const { contraseña, ...usuarioSinContra } = user._doc; 
      res.json({ status: "success", data: usuarioSinContra }); 
    } else {
      res.json({ status: "error", error: "Usuario no encontrado" });
    }
  } catch (error) {
    console.log("No se pudo obtener el usuario: " + error);
    res.json({ status: "error", error: "Error al obtener el usuario" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, contraseña, email } = req.body;
  if (!nombre || !apellido || !contraseña || !email)
    return res.json({ status: "error", error: "Datos faltantes" });
  const newUser = { nombre, apellido, contraseña, email };
  try {
    await userModel.findByIdAndUpdate(id, newUser);
    res.json({ status: "success", data: newUser });
  } catch (error) {
    console.log("No se pudo modificar el usuario: " + error);
  }
});

router.post("/login", async (req, res) => {
  const { email, contraseña } = req.body;
  if (!email || !contraseña) {
    return res.json({ status: "error", error: "Datos faltantes" });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ status: "error", error: "Usuario no encontrado" });
    }
    const contraseñaValida = await bcrypt.compare(contraseña, user.contraseña);
    if (!contraseñaValida) {
      return res.json({ status: "error", error: "Contraseña Incorrecta" });
    }
    const secret = process.env.SECRET;
    const token = jwt.sign({ userId: user._id }, secret, { expiresIn: '1h' });
    res.json({ status: "success", message: "Inicio de sesión exitoso" });
  } catch (error) {
    console.log("Error al iniciar sesión: " + error);
    res.json({ status: "error", error: "Error al iniciar sesión" });
  }
});

export default router;