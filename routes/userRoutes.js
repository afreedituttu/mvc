// const router = require('express').Router()
// const controllers = require('../controllers/userControllers')
// const passport = require('passport')

// function isLoged(req, res, next){
//     if(req.isAuthenticated()) return next();
//     res.redirect('/login')
// }
// function AlreadyLoged(req, res, next){
//     if(!req.isAuthenticated()) return next();
//     res.redirect('/getdetails')
// }

// router.get('/')
// router.get('/register',controllers.registerHome)
// router.get('/getdetails',isLoged,controllers.getdetails)
// router.post('/register',controllers.register)
// router.get('/login',AlreadyLoged,controllers.loginHome)
// router.post('/login',passport.authenticate('local',{successRedirect:"/getdetails",failureRedirect:"/login"}),controllers.loginPassport)
// router.get('/logout',controllers.logout)

// module.exports = router