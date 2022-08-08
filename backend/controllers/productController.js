const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const mongoose=require('mongoose');
exports.getProducts = catchAsyncErrors(async(req, res) => {
  const product = await Product.find({})
  res.json(product)
})

exports.getProductById  = catchAsyncErrors(async(req, res) => {
  var id = mongoose.Types.ObjectId(req.query.id)
  const product = await Product.findById(id)
  if(product){
      res.json(product) 
  }else{
      res.status(404).json({message: "product not found"})
      res.status(404)
      throw new ErrorHandler('product not found')
  }
})

exports.postProduct = catchAsyncErrors(async(req,res)=>{
  console.log(req.body)
  const product = new Product({
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
      availability: req.body.availability,
  })
  try {
      const newProduct = await product.save()
      res.json(newProduct)
  } catch {
      throw new ErrorHandler('product not created')
  }
})

exports.editProduct = catchAsyncErrors(async(req,res)=>{
  let product
  var id = mongoose.Types.ObjectId(req.query.id)
  try {
      product = await Product.findById(id)
      product.name = (req.body.name)?req.body.name:product.name
      product.price = (req.body.price)?req.body.price:product.price
      product.availability = (req.body.availability)?req.body.availability:product.availability
      product.category = (req.body.category)?req.body.category:product.category
      await product.save()
      res.json(product)
  } catch {
      if(product==null){
          throw new ErrorHandler('product not found')
      }else{
          throw new ErrorHandler('product not updated')
      }
  }
})

exports.deleteProduct = catchAsyncErrors(async(req,res)=>{
  let product
  const id = mongoose.Types.ObjectId(req.query.id)
  console.log(id);
  try {
      product = await Product.findById(req.query.id)
      console.log(product);
      await product.remove()
      res.json({"Result":"Removed"})
  } catch {
      if(product==null){
          throw new ErrorHandler('product not found')
      }else{
          throw new ErrorHandler('product not deleted')
      }
  }
})