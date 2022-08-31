const router = require('express').Router()
const userControllers = require('../controllers/user')
const productsController = require('../controllers/products')
const isLoged = require('../middlewares/auth').isLoged

router.get('/profile',isLoged,userControllers.profile)
router.get('/getusers',isLoged,userControllers.getusers)
router.get('/upload',isLoged,productsController.uploadHome)
router.post('/upload',isLoged,productsController.upload)

module.exports = router