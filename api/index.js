const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const mailer = require('./routes/mailer');
const admin = require('./routes/mailer');
const auth = require('./routes/auth');
const user = require('./routes/user');

const app = express();
const PORT = process.env.API_PORT || 5050;

// Middleware para analizar el cuerpo de la solicitud
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/api/test', (req, res) => {
  res.send("Express on Vercel");
});

app.use(session({
  secret: 'tu_clave_secreta',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Cambia a true si usas HTTPS
}));

// Rutas
app.use('/api/mailer', mailer);
app.use('/api/user', user);
app.use('/api/auth', auth);
app.use('/api/admin', admin);

app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});