const express = require('express')
const router = express.Router()
const usersController = require('../../controller/usersController')
const verifyRoles = require('../../middleware/verifyRoles')
const rolesArray = require('../../config/rolesArray')

router.route('/')
    .get(verifyRoles(rolesArray.Admin,rolesArray.Editor),usersController.getAllUser)
    .delete(verifyRoles(rolesArray.Admin),usersController.deleteUser)

router.route('/:id')
    .get(verifyRoles(rolesArray.Admin,rolesArray.Editor),usersController.getUser)

module.exports = router;