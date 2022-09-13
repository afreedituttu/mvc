const router = require('express').Router()
const isLoged = require('../middlewares/auth').isLoged
const productController = require('../controllers/products')
const upload = require('../controllers/products').upload
const uploadDirect = require('../helpers/s3').uploadDirect

router.get('/all', isLoged, productController.getAllProduct)
router.get('/add', isLoged, productController.addProductHome)
router.post('/add', [isLoged, upload.single('image')], productController.addProduct)
router.post('/delete', isLoged, productController.deleteProduct)

router.get('/uploadtos3', productController.uploadtos3Home)
router.post('/uploadtos3',upload.single('image'),productController.uploadtos3)
router.post('/readfroms3',productController.readFromS3)
router.get('/readfroms3/:key',productController.readFromS3)

router.get('/directtos3', productController.directToS3Home)
router.post('/directtos3',uploadDirect.single('image'), productController.directToS3)
router.get('/directgets3', productController.directGetS3)

module.exports = router