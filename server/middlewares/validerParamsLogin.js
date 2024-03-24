const validParameters = (req, res, next) => {
    const { email, password } = req.body.user;
    if (!email || !password) {
        return res.status(400).json({ error: "Falta el email o la contraseña" });
    }
    next();
}

module.exports = { validParameters };
