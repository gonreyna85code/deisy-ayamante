const express = require('express');
const fs = require('fs');
const router = express.Router();
const db = require('../database');

router.post('/upload', (req, res) => {
  const { name } = req.body;
  const image = req.files.image; 

  // Leer el archivo de imagen
  fs.readFile(image.path, (err, data) => {
    if (err) {
      return res.status(500).send(err);
    }

    // Insertar imagen en la base de datos
    db.insertImage(name, data, (err, id) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.send({ id });
    });
  });
});

// Ruta para obtener una imagen por ID
router.get('/image/:id', (req, res) => {
  const { id } = req.params;
  db.getImage(id, (err, row) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (!row) {
      return res.status(404).send('Imagen no encontrada');
    }
    res.contentType('image/jpeg');
    res.send(row.datos);
  });
});

module.exports = router;