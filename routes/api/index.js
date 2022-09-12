const router = require('express').Router()

router.post('/login', (req, res)=>{
    res.send('success at login')
})

module.exports = router