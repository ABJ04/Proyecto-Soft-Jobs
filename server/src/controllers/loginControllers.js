const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { loginEmailUser } = require('../../models/usuarioModel.js');
const { findError } = require('../utils/utils.js');

const createToken = async (email) => {
    console.log("Creando token para el usuario con correo electrónico:", email);
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: '60s',
    });
    return token;
};

const sendErrorResponse = async (res, errorCode) => {
    console.log("Enviando respuesta de error con el código:", errorCode);
    const errorFound = findError(errorCode);
    if (errorFound) {
      res.status(errorFound.status).json({ error: errorFound.message });
    } else {
      console.error("Código de error no encontrado:", errorCode);
      res.status(500).json({ error: "Error interno del servidor" });
    }
};

const loginUser = async (req, res) => {
    console.log("Iniciando proceso de autenticación de usuario...");
    const { email, password } = req.body.user;
    try {
        const findUser = await loginEmailUser({ email, password });
        if (!findUser) {
            console.log("Usuario no encontrado en la base de datos.");
            return sendErrorResponse(res, 'auth_01');
        }
        const token = await createToken(email);
        console.log("Token creado para el usuario:", email);
        res.status(200).json({
            message: `Bienvenido, ${email} has iniciado sesion`,
            code: 200,
            token
        });
    } catch (error) {
        console.error('Error al autenticar al usuario:', error);
        sendErrorResponse(res, 'server_error');
    }
};


module.exports = { loginUser, sendErrorResponse };
