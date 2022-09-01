const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    }
})

const productModel = mongoose.model('products',productSchema)

module.exports = productModel