const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
require('dotenv').config({ path: '../.env' });

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

// Ruta para manejar la solicitud de envío de correo desde el formulario de contacto
router.post('/send-email', (req, res) => {
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

module.exports = router;