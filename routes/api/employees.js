const express = require('express')
const router = express.Router()
const employeesController = require('../../controller/employeesController');
const verifyRoles = require('../../middleware/verifyRoles')
const rolesArray = require('../../config/rolesArray')

router.route('/')
    .get(employeesController.getAllEmployees)
    .post(verifyRoles(rolesArray.Admin,rolesArray.Editor),employeesController.createNewEmployee)
    .patch(verifyRoles(rolesArray.Admin,rolesArray.Editor),employeesController.updateEmployee)
    .delete(verifyRoles(rolesArray.Admin),employeesController.deleteEmployee)

router.route('/:id')
    .get(employeesController.getEmployee)

module.exports = router;