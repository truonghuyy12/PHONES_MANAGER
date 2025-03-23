const express = require('express');
const router = express.Router();

const adminController = require('../app/controllers/AdminController');

router.get('/customer_add',adminController.addCustomer)
router.post('/customer_store',adminController.storeCustomer)
router.get('/customer_search', adminController.searchCustomer);
router.put('/customer_updateone/:id',adminController.updateOneCustomer)
router.get('/customer_:id', adminController.updateCustomer);
router.delete('/customer_delete/:id', adminController.deleteCustomer);
router.get('/customer_detail/:customer_name', adminController.getDetailCustomer);
router.get('/', adminController.adminCustomer);

module.exports = router;