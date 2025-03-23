const express = require('express');
const router = express.Router();

const ReportController = require('../app/controllers/ReportController');

router.get('/', ReportController.invoice);

module.exports = router;
