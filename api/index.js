const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); // Cargar variables de entorno

const mailer = require('./routes/mailer');
const admin = require('./routes/admin'); // Ajuste la ruta para admin
const auth = require('./routes/auth');
const user = require('./routes/user');
const test = require('./routes/test');

const app = express();
const PORT = process.env.API_PORT || 5050;

// Conectar a la base de datos MongoDB
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.MONGO_DB, clientOptions);
        console.log("MongoDB Connected");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err.message);
        process.exit(1);
    }
}
connectToDatabase();

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
  secret: process.env.SESSION_SECRET || 'your_secret_key', 
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
      mongoUrl: process.env.MONGO_DB,
      collectionName: 'sessions',
      ttl: 6 * 60 * 60 // 6 horas en segundos
  }),
  cookie: {
      maxAge: 6 * 60 * 60 * 1000, // 6 horas en milisegundos
      httpOnly: true, // Solo accesible desde el servidor
      secure: process.env.NODE_ENV === 'production' // Solo se envía a través de HTTPS en producción
  }
}));

// Rutas
app.use('/api/test', test);
app.use('/api/mailer', mailer);
app.use('/api/user', user);
app.use('/api/auth', auth);
app.use('/api/admin', admin);

app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
