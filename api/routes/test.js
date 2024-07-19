const express = require('express');
const router = express.Router();

// Ruta para obtener un usuario por su ID
router.get('/test', (req, res) => {
    res.send("Express on Vercel");
});

module.exports = router;
