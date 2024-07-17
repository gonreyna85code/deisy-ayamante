// database.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

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

// Crear una tabla
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS imagenes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            datos BLOB NOT NULL
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
    }
};