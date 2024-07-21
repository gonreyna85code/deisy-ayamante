const express = require('express');
const router = express.Router();
const db = require('../database');
const nodemailer = require('nodemailer');
require('dotenv').config({ path: '../.env' });

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
router.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    db.registerUser(username, email, password, (err, userId) => {
        if (err) {
            return res.status(500).json({ error: `Error registrando usuario: ${err}` });
        }
        const verificationToken = db.generateVerificationToken();
        db.setVerificationToken(email, verificationToken, (err) => {
            if (err) {
                return res.status(500).json({ error: `Error generando token de verificación': ${err}` });
            }

            const mailOptions = {
                from: process.env.MAIL,
                to: email,
                subject: 'Verificación de Correo Electrónico',
                text: `Por favor, verifica tu correo electrónico usando el siguiente enlace: ${process.env.REACT_APP_BASE_URL}api/auth/verify-email?token=${verificationToken}`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return res.status(500).json({ error: `Error enviando correo de verificación': ${error}` });
                }
                res.status(201).json({ message: 'Usuario registrado. Por favor, verifica tu correo electrónico.', userId });
            });
        });
    });
});

// Ruta de verificación de correo electrónico
router.get('/verify-email', (req, res) => {
    console.log(req.query)
    const { token } = req.query;

    db.verifyToken(token, (err, user) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        if (user === 'Token inválido') {
            return res.status(400).json({ error: 'Token inválido' });
        }
        res.status(200).json({ message: 'Correo electrónico verificado exitosamente' });
    });
});

// Ruta de login
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    db.authenticateUser(email, password, (err, user) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        if (!user) {
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }
        req.session.userId = user.id;
        req.session.isAdmin = user.isAdmin;
        res.status(200).json({ message: 'Autenticado correctamente', user });
    });
});

router.get('/check-auth', (req, res) => {
    if (req.session.userId) {
        res.status(200).json({ authenticated: true, userId: req.session.userId, isAdmin: req.session.isAdmin });
    } else {
        res.status(401).json({ authenticated: false });
    }
});

module.exports = router;
