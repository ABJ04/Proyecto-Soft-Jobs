const validateUser = (req, res, next) => {
    const { users } = req.body;
    if (!users || !users.email || !users.password || !users.rol || !users.lenguage) {
        return res.status(400).json({ error: "Los campos 'email', 'password', 'rol' y 'lenguage' deben estar presentes en la solicitud." });
    }
    next(); 
}

module.exports = { validateUser };