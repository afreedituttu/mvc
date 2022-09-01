const router = require('express').Router()
const isLoged = require('../middlewares/auth').isLoged
const productController = require('../controllers/products')
const upload = require('../controllers/products').upload

router.get('/all', isLoged, productController.getAllProduct)
router.get('/add', isLoged, productController.addProductHome)
router.post('/add', [isLoged, upload.single('image')], productController.addProduct)
router.post('/delete', isLoged, productController.deleteProduct)

module.exports = router