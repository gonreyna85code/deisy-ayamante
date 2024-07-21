const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

// Ruta al archivo de la base de datos
const dbPath = path.resolve(__dirname, 'mi_base_de_datos.db');

// Conectar a la base de datos
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error al abrir la base de datos:', err.message);
    } else {
        console.log('Conectado a la base de datos SQLite');
    }
});

// Crear tablas
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS imagenes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            datos BLOB NOT NULL
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            verified INTEGER NOT NULL DEFAULT 0,
            isAdmin INTEGER NOT NULL DEFAULT 0,
            verificationToken TEXT
        )
    `);
});

module.exports = {
    db,

    // Insertar una imagen en la base de datos
    insertImage: (name, imageData, callback) => {
        const sql = `INSERT INTO imagenes (nombre, datos) VALUES (?, ?)`;
        db.run(sql, [name, imageData], function (err) {
            if (err) {
                return callback(err);
            }
            callback(null, this.lastID);
        });
    },

    // Establecer un token de verificación para un usuario
    setVerificationToken: (email, token, callback) => {
        const sql = `UPDATE usuarios SET verificationToken = ? WHERE email = ?`;
        db.run(sql, [token, email], function (err) {
            if (err) {
                return callback(err);
            }
            callback(null);
        });
    },

    // Generar un token de verificación
    generateVerificationToken: () => crypto.randomBytes(32).toString('hex'),

    // Verificar el token y actualizar el estado del usuario
    verifyToken: (token, callback) => {
        const sql = `SELECT * FROM usuarios WHERE verificationToken = ?`;
        db.get(sql, [token], (err, user) => {
            if (err) {
                return callback(err);
            }
            if (!user) {
                return callback(null, 'Token inválido');
            }
            const updateSql = `UPDATE usuarios SET verified = 1, verificationToken = NULL WHERE verificationToken = ?`;
            db.run(updateSql, [token], function (err) {
                if (err) {
                    return callback(err);
                }
                callback(null, user);
            });
        });
    },

    // Obtener una imagen por su ID
    getImage: (id, callback) => {
        const sql = `SELECT * FROM imagenes WHERE id = ?`;
        db.get(sql, [id], (err, row) => {
            if (err) {
                return callback(err);
            }
            callback(null, row);
        });
    },

    // Registrar un usuario
    registerUser: (username, email, password, callback) => {
        const hashedPassword = bcrypt.hashSync(password, 10);
        const sql = `INSERT INTO usuarios (username, email, password) VALUES (?, ?, ?)`;
        db.run(sql, [username, email, hashedPassword], function (err) {
            if (err) {
                return callback(err);
            }
            callback(null, this.lastID);
        });
    },

    // Autenticar un usuario
    authenticateUser: (email, password, callback) => {
        const sql = `SELECT * FROM usuarios WHERE email = ?`;
        db.get(sql, [email], (err, row) => {
            if (err) {
                return callback(err);
            }
            if (row && bcrypt.compareSync(password, row.password)) {
                callback(null, row);
            } else {
                callback(null, null);
            }
        });
    },

    // Obtener un usuario por su ID
    getUser: (id, callback) => {
        const sql = `SELECT * FROM usuarios WHERE id = ?`;
        db.get(sql, [id], (err, row) => {
            if (err) {
                return callback(err);
            }
            callback(null, row);
        });
    }
};
