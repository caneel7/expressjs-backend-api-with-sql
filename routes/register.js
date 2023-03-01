const express = require('express');
const router = express.Router();
const registerController = require('../controller/registerController')

router.post('/',registerController.registerHandler);

module.exports = router;