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
    login:async(req,res)=>{
        try{
            console.log('im entered to user');
            const { email, password } = req.body

            const user = await userModel.findOne({email:email}).lean()
            console.log(user);

            if(!user) return res.render('loginPage',{error:'user does not exist'})
            console.log('user doesnt exist');
            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) return res.render('loginPage',{error:"password is incorrect"})

            const token = jwt.sign({name:user.name,email:user.email},secret,{expiresIn:'1h'})
            res.cookie('jwt',token)
            return res.render('loginPage',{logedIn:true, name:user.name, email:user.email, discription:user.discription,token:token})

        }catch(err){
            res.render('Error')
            console.log(err);
        }
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

            await user.save().then((err, id)=>{
                if(err) throw err;
                res.redirect('/auth/login')
            }).catch((err)=>{
                console.log(err);
                res.render('Error')
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