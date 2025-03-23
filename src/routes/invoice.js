const express = require('express');
const router = express.Router();

const invoiceController = require('../app/controllers/InvoiceController');

router.get('/', invoiceController.invoice);
router.post('/search',invoiceController.searchProduct)

module.exports = router;
