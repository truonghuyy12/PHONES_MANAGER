const express = require('express');
const router = express.Router();

const posController = require('../app/controllers/PosController');

router.post('/bill', posController.printBill);
router.get('/', posController.pos);

module.exports = router;   