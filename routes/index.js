const express = require('express')
const router = express.Router()

const api = require('./api')
const authRoutes = require('./auth')
const userRoutes = require('./user')
const productRoutes = require('./product')

router.use('/', userRoutes)
router.use('/api', api)
router.use('/auth', authRoutes)
router.use('/product', productRoutes)

// router.use('/', (req,res) => res.send('nothing found') ) // will prevent static files

module.exports = router