const { pool } = require('../database/config.js');
const bcrypt = require('bcryptjs');

const createUserModel = async ({ email, password, rol, lenguage }) => {
    const hashedPassword = bcrypt.hashSync(password);
    const SQLquery = {
        text: 'INSERT INTO usuarios (email, password, rol, lenguage) VALUES ($1, $2, $3, $4) RETURNING *',
        values: [email, hashedPassword, rol, lenguage],
    };
    const res = await pool.query(SQLquery);
    return res.rows[0];
};

const loginEmailUser = async ({ email, password }) => {
    try {
        const SQLquery = {
            text: "SELECT * FROM usuarios WHERE email = $1",
            values: [email],
        };
        const res = await pool.query(SQLquery);

        if (res.rows.length === 0) {
            throw new Error("El usuario no fue encontrado en la base de datos");
        }

        const user = res.rows[0];
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Contraseña incorrecta");
        }

        return user;
    } catch (error) {
        console.error("Error al buscar el usuario en la base de datos:", error.message);
        throw error;
    }
};


module.exports = { createUserModel, loginEmailUser };
