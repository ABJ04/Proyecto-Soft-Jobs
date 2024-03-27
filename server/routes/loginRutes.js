const express = require('express');
const router = express.Router();
const { loginUser } = require('../src/controllers/loginControllers.js');
const { validParameters } = require('../middlewares/validerParamsLogin.js'); 

router.post('/login', validParameters, loginUser);

module.exports = router;
