const express = require('express');
const router = express.Router();
const db = require('../database');

// Ruta de registro
router.post('/register', (req, res) => {
    const { username, password, isAdmin } = req.body;
    db.registerUser(username, password, isAdmin, (err, userId) => {
        if (err) {
            return res.status(500).json({ error: 'Error registrando usuario' });
        }
        res.status(201).json({ message: 'Usuario registrado', userId });
    });
});

// Ruta de login
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.authenticateUser(username, password, (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Error en la autenticación' });
        }
        if (!user) {
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }
        req.session.userId = user.id;
        req.session.isAdmin = user.isAdmin;
        res.status(200).json({ message: 'Autenticado correctamente', user });
    });
});

// Ruta para verificar si el usuario está autenticado
router.get('/check-auth', (req, res) => {
    if (req.session.userId) {
        res.status(200).json({ authenticated: true, userId: req.session.userId, isAdmin: req.session.isAdmin });
    } else {
        res.status(401).json({ authenticated: false });
    }
});

module.exports = router;
