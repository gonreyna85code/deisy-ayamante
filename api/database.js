const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { Usuario, Imagen } = require('./models');

// Registrar un usuario
const registerUser = async (username, email, password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new Usuario({ username, email, password: hashedPassword });
        return await newUser.save();
    } catch (err) {
        console.error("Error registering user:", err.message);
        throw err;
    }
};

// Autenticar un usuario
const authenticateUser = async (email, password) => {
    try {
        const user = await Usuario.findOne({ email });
        if (user && await bcrypt.compare(password, user.password)) {
            return user;
        }
        return null;
    } catch (err) {
        console.error("Error authenticating user:", err.message);
        throw err;
    }
};

// Obtener una imagen por su ID
const getImage = async (id) => {
    try {
        return await Imagen.findById(id);
    } catch (err) {
        console.error("Error getting image:", err.message);
        throw err;
    }
};

// Establecer un token de verificación
const setVerificationToken = async (email, token) => {
    try {
        return await Usuario.updateOne({ email }, { verificationToken: token });
    } catch (err) {
        console.error("Error setting verification token:", err.message);
        throw err;
    }
};

// Verificar el token
const verifyToken = async (token) => {
    try {
        const user = await Usuario.findOne({ verificationToken: token });
        if (!user) return 'Token inválido';
        user.verified = true;
        user.verificationToken = null;
        await user.save();
        return user;
    } catch (err) {
        console.error("Error verifying token:", err.message);
        throw err;
    }
};

module.exports = {
    registerUser,
    authenticateUser,
    getImage,
    setVerificationToken,
    verifyToken
};
