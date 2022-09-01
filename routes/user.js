const router = require('express').Router()
const userControllers = require('../controllers/user')
const isLoged = require('../middlewares/auth').isLoged

router.get('/profile',isLoged,userControllers.profile)
router.get('/getusers',isLoged,userControllers.getusers)


module.exports = router