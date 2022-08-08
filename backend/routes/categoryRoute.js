const express = require("express");
const {
  deleteCategory, editCategory, getCategories, getCategoryById, postCategory 
} = require("../controllers/categoryController");
const {isAuthenticatedUser}= require('../middleware/auth') 
const router = express.Router();
router.route('/').get(getCategories)

router.route('/:id').get(getCategoryById)

router.route('/create').post(postCategory)

router.route('/edit').put(editCategory)

router.route('/delete').delete(deleteCategory)

module.exports = router;