const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const userRouter = require('./routes/userRouter.js');
const loginRoutes = require('./routes/loginRutes.js');
const dotenv = require('dotenv');

dotenv.config();

if (!process.env.PORT) {
    throw new Error('La variable de entorno PORT es necesaria para iniciar el servidor.');
}

const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan('combined'));
app.use(express.json());
app.use(cors());


app.use('/usuarios', userRouter);
app.use('/usuarios', loginRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Error interno del servidor');
});

app.listen(PORT, () => {
    console.log(`🔥 Servidor en marcha 🔥 http://localhost:${PORT}`);
});
