const express = require('express');
const router = express.Router();
const { Usuario } = require('../models'); // Asegúrate de que la ruta sea correcta
const nodemailer = require('nodemailer');
require('dotenv').config();
const bcrypt = require('bcrypt');
const crypto = require('crypto');

// Configuración del transporte para enviar correos electrónicos
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.MAIL,
        pass: process.env.PSSAPP
    }
});

// Ruta de registro
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Verificar si el usuario ya existe
        const existingUser = await Usuario.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'El correo electrónico ya está registrado.' });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const verificationToken = crypto.randomBytes(32).toString('hex');
        
        // Crear un nuevo usuario
        const newUser = new Usuario({
            username,
            email,
            password: hashedPassword,
            verificationToken
        });

        await newUser.save();

        // Enviar correo de verificación
        const mailOptions = {
            from: process.env.MAIL,
            to: email,
            subject: 'Verificación de Correo Electrónico',
            text: `Por favor, verifica tu correo electrónico usando el siguiente enlace: ${process.env.REACT_APP_API_BASE_URL || process.env.REACT_APP_BASE_URL}/api/auth/verify-email?token=${verificationToken}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ error: `Error enviando correo de verificación: ${error}` });
            }
            res.status(201).json({ message: 'Usuario registrado. Por favor, verifica tu correo electrónico.', userId: newUser._id });
        });

    } catch (err) {
        res.status(500).json({ error: `Error registrando usuario: ${err}` });
    }
});

// Ruta de verificación de correo electrónico
router.get('/verify-email', async (req, res) => {
    const { token } = req.query;

    try {
        const user = await Usuario.findOne({ verificationToken: token });
        if (!user) {
            return res.status(400).json({ error: 'Token inválido' });
        }
        user.verified = true;
        user.verificationToken = null;
        await user.save();
        res.redirect('/'); // Redirige al usuario a la página principal después de la verificación
    } catch (err) {
        res.status(500).json({ error: `Error al verificar el token: ${err}` });
    }
});

// Ruta de login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Usuario.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }

        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }

        req.session.userId = user._id;
        req.session.isAdmin = user.isAdmin;

        res.status(200).json({ message: 'Autenticado correctamente', user });
    } catch (err) {
        res.status(500).json({ error: `Error en la autenticación: ${err}` });
    }
});

// Ruta para verificar la autenticación
router.get('/check-auth', (req, res) => {
    if (req.session.userId) {
        res.status(200).json({ authenticated: true, userId: req.session.userId, isAdmin: req.session.isAdmin });
    } else {
        res.status(401).json({ authenticated: false });
    }
});

module.exports = router;
