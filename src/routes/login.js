const express = require('express');
const router = express.Router();

const loginController = require('../app/controllers/LoginController');


router.get('/', loginController.login);
router.post('/',loginController.authLogin)
router.post('/confirm',loginController.confirmLogin)
router.get('/confirm', loginController.getConfirmLogin);

module.exports = router;