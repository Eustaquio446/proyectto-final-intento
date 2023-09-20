import mongoose from "mongoose";

const albumsCollection = "albums";

const album = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, "Por favor, escriba el título"],
  },
  descripcion: {
    type: String,
    required: [true, "Por favor, escriba una descripción"],
    minlength: [5, "Debe tener al menos 5 caracteres"],
    maxlength: [500, "Debe tener como máximo 500 caracteres"],
  },
  añoSalida: {
    type: String,
    required: [true, "Por favor, escriba el año de salida"],
  },
  canciones: [
    {
      nombreCancion: { type: String, required: true },
      duracionCancion: { type: String, required: true },
    },
  ],
  url: {
    type: String
  },
});


const albumModel = mongoose.model(albumsCollection, album);
export default albumModel;
