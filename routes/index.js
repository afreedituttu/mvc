const express = require('express')
const router = express.Router()
const apiroutes = require('./userRoutes')

router.use('/',apiroutes)

// router.use('/', (req,res) => res.send('nothing found') ) // will prevent static files

module.exports = router