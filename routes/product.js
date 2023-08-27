const express = require('express');
const productController = require('../controller/products')

const router = express.Router()

router.post('/', productController.createProduct)
    .get('/ssr', productController.readAllProductsSSR)
    .get('/add', productController.getAddForm)
    .get('/', productController.readAllProducts)
    .get('/:id', productController.readProduct)
    .put('/:id', productController.replaceProduct)
    .patch('/:id', productController.updateProduct)
    .delete('/:id', productController.deleteProduct);

exports.router = router;