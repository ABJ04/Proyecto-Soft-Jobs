const { createUserModel } = require("../../models/usuarioModel.js");
const { getUserByEmail } = require('../utils/dbUtils.js');

const createNewUser = async (req, res) => {
    try {
        console.log("Body de la solicitud:", req.body); 
        const { users } = req.body;

        if (!users) {
            return res.status(400).json({ error: "El campo 'users' debe estar presente en la solicitud." });
        }
        const { email, password, rol, lenguage } = users;
        if (!email || !password || !rol || !lenguage) {
            return res.status(400).json({ error: "Los campos 'email', 'password', 'rol' y 'lenguage' son obligatorios." });
        }
        if (typeof email !== 'string' || typeof password !== 'string' || typeof rol !== 'string' || typeof lenguage !== 'string') {
            return res.status(400).json({ error: "Los campos 'email', 'password', 'rol' y 'lenguage' deben ser de tipo string." });
        }
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ error: "El correo electrónico ya está en uso. Por favor, utiliza otro correo electrónico." });
        }

        const newUser = await createUserModel(users);

        res.status(201).json({ message: "Usuario creado exitosamente.", user: newUser });
    } catch (error) {
        console.error("Error al crear un nuevo usuario:", error);
        res.status(500).json({ error: "Error interno del servidor. Por favor, contacta al administrador del sistema." });
    }
};

module.exports = { createNewUser };
