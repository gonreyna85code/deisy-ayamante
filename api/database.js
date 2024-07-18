const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcrypt');

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
            password TEXT NOT NULL,
            isAdmin INTEGER NOT NULL DEFAULT 0
        )
    `);
});

module.exports = db;

module.exports = {
    db,
    insertImage: (name, imageData, callback) => {
        const sql = `INSERT INTO imagenes (nombre, datos) VALUES (?, ?)`;
        db.run(sql, [name, imageData], function(err) {
            if (err) {
                return callback(err);
            }
            callback(null, this.lastID);
        });
    },
    getImage: (id, callback) => {
        const sql = `SELECT * FROM imagenes WHERE id = ?`;
        db.get(sql, [id], (err, row) => {
            if (err) {
                return callback(err);
            }
            callback(null, row);
        });
    },
    registerUser: (username, password, isAdmin, callback) => {
        const hashedPassword = bcrypt.hashSync(password, 10);
        const sql = `INSERT INTO usuarios (username, password, isAdmin) VALUES (?, ?, ?)`;
        db.run(sql, [username, hashedPassword, isAdmin ? 1 : 0], function(err) {
            if (err) {
                return callback(err);
            }
            callback(null, this.lastID);
        });
    },
    authenticateUser: (username, password, callback) => {
        const sql = `SELECT * FROM usuarios WHERE username = ?`;
        db.get(sql, [username], (err, row) => {
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
