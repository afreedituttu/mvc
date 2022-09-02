const userModel = require('../models/userModels')
const chalk = require('chalk')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const secret = process.env.JWT_SECRET_KEY

module.exports = {
    loginHome:(req,res)=>{
        res.render('loginPage')
    },
    registerHome:(req,res)=>{
        res.render('userRegister')
    },
    register:async(req,res)=>{
        try{
            const { name, email } = req.body;
            const discription = req.body.discription;

            const existingUser = await userModel.findOne({email:email})
            if(existingUser) return res.render('userRegister',{ error:"user already exist"})

            if(!email) return res.render('userRegister',{ error:'please type email address'});
            if(!name) return res.render('userRegister',{ error:'please enter your name' });

            const salt = await bcrypt.genSalt(10)
            const password = await bcrypt.hash(req.body.password, salt)

            const user = new userModel({
                name:name,
                email:email,
                password:password,
                discription:discription
            })

            await user.save().then((id)=>{
                res.redirect('/auth/login')
            }).catch((err)=>{
                console.log(err);
                res.send('Error occured at saving user at database')
            })
        }catch(err){
            res.render('Error',{error:err})
            console.log(err);
        }
    },
    logout:async(req, res, next)=>{
        req.logout((err)=>{
            if(err) return next(err);
            res.redirect('/auth/login');
        })
    },
}