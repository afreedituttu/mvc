const router = require('express').Router();


const homepageRoute = require('./homepage')
const authRoute = require('./auth')

router.use('/home',homepageRoute)
router.use('/auth', authRoute)

module.exports = router