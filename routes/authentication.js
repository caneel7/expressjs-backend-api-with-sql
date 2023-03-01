const express = require('express');
const router = express.Router();
const authneticationController = require('../controller/authenticationController')

router.post('/',authneticationController.loginHanlder)

module.exports = router;