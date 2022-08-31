const router = require('express').Router()
const controllers = require('../controllers/auth')
const passport = require('passport')
const AlreadyLoged = require('../middlewares/auth').AlreadyLoged
const isLoged = require('../middlewares/auth').isLoged

router.get('/login', AlreadyLoged,controllers.loginHome)
router.get('/logout' ,isLoged,controllers.logout)
router.get('/register', controllers.registerHome)

router.post('/login', passport.authenticate('local',{successRedirect:"/getusers",failureRedirect:"/auth/login"}))
router.post('/register', controllers.register)

module.exports = router