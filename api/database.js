const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { Usuario, Imagen } = require('./models');

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(process.env.MONGO_DB, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("MongoDB Connected");
  } catch (err) {
    await mongoose.disconnect();
    console.log("MongoDB Disconnected");
    return err    
  }
}
run().catch(console.dir);

// Registrar un usuario
const registerUser = async (username, email, password) => {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new Usuario({ username, email, password: hashedPassword });
    return await newUser.save();
};

// Autenticar un usuario
const authenticateUser = async (email, password) => {
    const user = await Usuario.findOne({ email });
    if (user && bcrypt.compareSync(password, user.password)) {
        return user;
    }
    return null;
};

// Obtener una imagen por su ID
const getImage = async (id) => {
    return await Imagen.findById(id);
};

// Establecer un token de verificación
const setVerificationToken = async (email, token) => {
    return await Usuario.updateOne({ email }, { verificationToken: token });
};

// Verificar el token
const verifyToken = async (token) => {
    const user = await Usuario.findOne({ verificationToken: token });
    if (!user) return 'Token inválido';
    user.verified = true;
    user.verificationToken = null;
    await user.save();
    return user;
};

module.exports = {
    registerUser,
    authenticateUser,
    getImage,
    setVerificationToken,
    verifyToken
};
