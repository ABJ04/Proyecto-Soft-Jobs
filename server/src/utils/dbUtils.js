const { pool } = require('../../database/config.js');

const getUserByEmail = async (email) => {
    try {
        const query = {
            text: 'SELECT * FROM usuarios WHERE email = $1',
            values: [email],
        };
        const result = await pool.query(query);
        return result.rows[0];
    } catch (error) {
        console.error('Error al buscar usuario por correo electrónico:', error);
        throw new Error('Error al buscar usuario por correo electrónico');
    }
};

module.exports = { getUserByEmail };
