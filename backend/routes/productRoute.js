const express = require('express');
const { deleteProduct, editProduct, getProducts, getProductById, postProduct  } = require('../controllers/productcontroller');
const {isAuthenticatedUser}= require('../middleware/auth')
const router = express.Router();
router.route('/').get(getProducts)

router.route('/:id').get(getProductById)
router.route('/create').post(postProduct)
router.route('/edit').put(editProduct)
router.route('/delete').delete(deleteProduct)

module.exports =router