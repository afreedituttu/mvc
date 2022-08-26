const mongoose = require('mongoose')

const User = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:20
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    discription:{
        type:String,
        default:null,
        minlength:10,
        maxlength:100
    }
})

module.exports = mongoose.model('User',User)