const Category = require("../models/categoryModel");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const mongoose=require("mongoose");
exports.getCategories = catchAsyncErrors(async(req, res) => {
    const category = await Category.find({})
    res.json(category)
})

exports.getCategoryById  = catchAsyncErrors(async(req, res) => {
    const category = await Category.findById(req.params.id)
    if(category){
        res.json(category)
    }else{
        res.status(404).json({message: "Category not found"})
        res.status(404)
        throw new ErrorHandler('Category not found')
    }
})

exports.postCategory = catchAsyncErrors(async(req,res)=>{
    console.log(req.body.name)
    const category = new Category({
        name: req.body.name
    })
    try {
        const newCategory = await category.save()
        res.json(newCategory)
    } catch(err) {
        throw new ErrorHandler(err)
    }
})

exports.editCategory = catchAsyncErrors(async(req,res)=>{
    let category
    var id = mongoose.Types.ObjectId(req.query.id)
    try {
        category = await Category.findById(id)
        category.name = (req.body.name)?req.body.name:category.name
        await category.save()
        res.json(category)
    } catch {
        if(category==null){
            throw new ErrorHandler('Category not found')
        }else{
            throw new ErrorHandler('Category not updated')
        }
    }
})

exports.deleteCategory = catchAsyncErrors(async(req,res)=>{
    let category
    var id = mongoose.Types.ObjectId(req.query.id)
    try {
        category = await Category.findById(id)
        var query = {category: id}
        const test = await Product.deleteMany(query)
        console.log(test)
        await category.remove()
        res.json({"Result":"Removed"})
    } catch {
        if(category==null){
            throw new ErrorHandler('Category not found')
        }else{
            throw new ErrorHandler('Category not deleted')
        }
    }
})