const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mailer = require('./routes/mailer');
const admin = require('./routes/mailer');

const app = express();
const PORT = process.env.API_PORT || 5050;

// Middleware para analizar el cuerpo de la solicitud
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Rutas
app.use('/api', mailer);
app.use('/api', admin);

app.get('/api/test', (req, res) => {
  res.send("Express on Vercel");
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor Express en funcionamiento en el puerto ${PORT}`);
});
