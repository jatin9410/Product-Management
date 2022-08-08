const mongoose = require('mongoose');

const productSchema= new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    price:{
        type: Number,
        required:true,
        maxLength:[8,"Price cannot exceed 8 characters"]
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:true,
    },
    availability:{
        type:Number,
        required:true,
        default:1
    }
},{
    timestamps:true
})

module.exports=mongoose.model("Product",productSchema)