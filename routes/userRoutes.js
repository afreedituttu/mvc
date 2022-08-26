const router = require('express').Router()
const controllers = require('../controllers/userControllers')

router.get('/')
router.get('/register',controllers.registerHome)
router.get('/getdetails',controllers.getdetails)
router.post('/register',controllers.register)
router.get('/login',controllers.loginHome)
router.post('/login',controllers.login)

module.exports = router