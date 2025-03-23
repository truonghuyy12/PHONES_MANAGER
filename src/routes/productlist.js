const express = require('express');
const router = express.Router();

const productController = require('../app/controllers/ProductController');
router.get('/add',productController.getAddProduct);
router.post('/add',productController.addProduct);

router.get('/edit/:id',productController.getEditProduct);
router.post('/edit/:id',productController.editProduct);

router.get('/delete/:id',productController.deleteProduct);
router.post('/delete/:id',productController.getProducts);
router.get('/:id', productController.detailProduct);

router.get('/', productController.getProducts);
module.exports = router;
