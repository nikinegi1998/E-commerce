const isLoggedIn = (req, res, next)=>{
    if(!req.isAuthenticated()){
        req.flash('error', 'Login to continue')
        res.redirect('/login');
    }
    next();
}

module.exports= {isLoggedIn};