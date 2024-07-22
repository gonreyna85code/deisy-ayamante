const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const mailer = require('./routes/mailer');
const admin = require('./routes/mailer');
const auth = require('./routes/auth');
const user = require('./routes/user');
const test = require('./routes/test')

const app = express();
const PORT = process.env.API_PORT || 5050;

// Middleware para analizar el cuerpo de la solicitud
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
  secret: 'your_secret_key', // Cambia esto por una clave secreta segura
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
      mongoUrl: process.env.MONGO_DB,
      mongooseConnection: mongoose.connection
  })
}));

// Rutas
app.use('/api', test)
app.use('/api/mailer', mailer);
app.use('/api/user', user);
app.use('/api/auth', auth);
app.use('/api/admin', admin);

app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});