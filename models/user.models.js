import mongoose from "mongoose";

const userColecction = "users";

const usuario = new mongoose.Schema({
  nombre: { type: String, require: [true, "Porfavor escriba su nombre"] },
  apellido: { type: String, require: [true, "Porfavor escriba su apellido"] },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        const regex = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/;
        return regex.test(value);
      },
      message: "No es un email válido",
    },
  },
  contraseña: {
    type: String,
    require: [true, "Porfavor escriba su contraseña"],
  },
});

const userModel = mongoose.model(userColecction, usuario);
export default userModel;