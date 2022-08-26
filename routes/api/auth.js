const router = require('express').Router()

router.get('/login',(req,res)=>{
    res.render('loginpage')
})

module.exports = router