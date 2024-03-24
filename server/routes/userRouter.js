const express = require('express');
const { createNewUser } = require('../src/controllers/registerControllers.js');
const { validateUser } = require('../middlewares/validateParamsUser.js'); 

const router = express.Router();

router.post('/', validateUser, createNewUser);

module.exports = router;
