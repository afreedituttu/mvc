const userModel = require('../models/userModels')
const chalk = require('chalk')

module.exports = {
    home:(req, res)=>{
        res.render('homePage')
    },
    profile:(req, res)=>{
        res.send('im at home')
    },
    getusers:async(req,res)=>{
        try{
            userModel.find({}).lean().then((data)=>{
                res.render('userDetails',{'datas':data})
            }).catch((err)=>{
                console.log(err);
                res.send('not ok')
            })
        }catch(err){
            console.log(`${chalk.red(`${err}`)}`);
            res.send('err')
        }
    },
    deleteUser:async(req, res)=>{
        try{
            const { id } = req.body
            userModel.deleteOne({_id:id}).then((result)=>{
                res.redirect('/getusers')
            }).catch((err)=>{
                console.log(err);
                res.send('some error occured and failed to delete')
            })
        }catch(err){
            console.log(err);
            res.send('err occured during deletio of user')
        }
    }
}