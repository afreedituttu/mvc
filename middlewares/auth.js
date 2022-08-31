module.exports = {
    isLoged:(req, res, next)=>{
        if(req.isAuthenticated()) return next();
        res.redirect('/auth/login')
    },
    AlreadyLoged:(req, res, next)=>{
        if(!req.isAuthenticated()) return next();
        res.redirect('/')
    }
    
}