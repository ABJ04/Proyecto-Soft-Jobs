// En tu archivo principal de la aplicación, por ejemplo, app.js o index.js

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const userRouter = require('./routes/userRouter.js');
const loginRoutes = require('./routes/loginRutes.js'); // Asegúrate de importar el archivo correcto
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

// Monta los enrutadores
app.use('/usuarios', userRouter);
app.use('/usuarios', loginRoutes); // Asegúrate de montar el enrutador en /usuarios

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Error interno del servidor');
});

app.listen(PORT, () => {
    console.log(`🔥 Servidor en marcha 🔥 http://localhost:${PORT}`);
});
