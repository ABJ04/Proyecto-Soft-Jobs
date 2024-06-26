const pg = require('pg');
require("dotenv").config();
if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_DATABASE) {
    throw new Error('Faltan variables de entorno necesarias para la conexión a la base de datos.');
}
const pool = new pg.Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    allowExitOnIdle: true,
});
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Error al conectar con la base de datos:', error);
        process.exit(1);
    } else {
        console.log('🔋 Database on 🔋');
    }
});

module.exports = { pool };