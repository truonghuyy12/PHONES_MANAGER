const express = require('express');
const router = express.Router();

const adminController = require('../app/controllers/AdminController');

router.post('/delete-employee-:id',adminController.deleteEmployee)
router.get('/employee_add',adminController.addEmployee)
router.post('/employee_store',adminController.deleteEmployee)
router.get('/', adminController.adminEmployee);

module.exports = router;