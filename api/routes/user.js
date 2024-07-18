const express = require('express');
const router = express.Router();
const db = require('../database');

// Ruta para obtener un usuario por su ID
router.get('/:id', (req, res) => {
    const userId = req.params.id;
    db.getUser(userId, (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Error obteniendo usuario' });
        }
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.status(200).json(user);
    });
});

module.exports = router;
