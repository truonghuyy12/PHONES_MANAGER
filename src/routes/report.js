const express = require('express');
const router = express.Router();

const reportController = require('../app/controllers/ReportController');

router.get('/sale', reportController.sale);
router.get('/invoice', reportController.invoice)
// router.get('/sale_report', reportController.sale);
router.get('/', reportController.sale);


module.exports = router;