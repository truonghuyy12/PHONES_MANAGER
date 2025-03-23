const express = require('express');
const router = express.Router();

const customerController = require('../app/controllers/CustomerController');
router.post('/findcustomer', customerController.findCustomer);
router.get('/customer_search', customerController.searchCustomer);
router.get('/', customerController.customer);

module.exports = router;