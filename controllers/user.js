const userModel = require('../models/userModels')
const chalk = require('chalk')

module.exports = {
    home:(req, res)=>{
        res.render('homePage')
    },
    profile:(req, res)=>{
        console.log(req.session.passport.user);
        res.send('im at home')
    },
    getusers:async(req,res)=>{
        try{
            userModel.find({}).lean().then((data)=>{
                console.log(data);
                res.render('userDetails',{'datas':data})
            }).catch((err)=>{
                console.log(err);
                res.send('not ok')
            })
        }catch(err){
            console.log(`${chalk.red(`${err}`)}`);
            res.send('err')
        }
    }
}