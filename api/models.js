const { Schema, model } = require('mongoose');

// Modelo de Usuario
const usuarioSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    verified: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    verificationToken: { type: String }
});

const Usuario = model('Usuario', usuarioSchema);

// Modelo de Imagen
const imagenSchema = new Schema({
    nombre: { type: String, required: true },
    datos: { type: Buffer, required: true }
});

const Imagen = model('Imagen', imagenSchema);

module.exports = { Usuario, Imagen };
