const router = require('express').Router()
const controllers = require('../controllers/user')
const isLoged = require('../middlewares/auth').isLoged

router.get('/profile',isLoged,controllers.profile)
router.get('/getusers',isLoged,controllers.getusers)

module.exports = router