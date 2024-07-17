const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config({ path: '../.env' });
const db = require('./database');
const fs = require('fs');

const app = express();
const PORT = process.env.API_PORT || 5050;

// Middleware para analizar el cuerpo de la solicitud
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// env update
// Configuración del transporte para enviar correos electrónicos (aquí se utiliza Gmail como ejemplo)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL,
    pass: process.env.PSSAPP
  }
});

app.get('/api/test', (req, res) => {
  res.send("Express on Vercel");
});

// Ruta para manejar la solicitud de envío de correo desde el formulario de contacto
app.post('/api/send-email', (req, res) => {
  const { name, email, message } = req.body;


  const mailOptions = {
    from: email, // Establecer el remitente como la dirección de correo electrónico proporcionada por el usuario
    replyTo: email, // Configurar replyTo para que las respuestas vayan a la dirección de correo electrónico del remitente
    to: "deisy.ayamante@gmail.com",
    subject: `Mensaje de ${name} desde el formulario de contacto`,
    text: message // Usar la cadena de texto en lugar del array
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(200).send(error);
    } else {
      res.json({ success: true });
    }
  });

});

app.post('/upload', (req, res) => {
  const { name } = req.body;
  const image = req.files.image; // Supongamos que usas un middleware como express-fileupload

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
app.get('/image/:id', (req, res) => {
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

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor Express en funcionamiento en el puerto ${PORT}`);
});
