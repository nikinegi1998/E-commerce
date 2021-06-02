const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../model/user');


router.get('/register',  async(req, res)=>{
    res.render('signup/register')
})

router.post('/register', async(req, res)=>{
    try{
        const nuser= new User({username:req.body.username, usertype:req.body.usertype, email:req.body.email});
        console.log(req.body);
        await User.register(nuser, req.body.password);
        req.flash('success', 'New user registered successfuly. Please login to continue.')
        res.redirect('/login');
    }
    catch(err){
        req.flash('error', e.message);
        res.redirect('/register');
    }
})


router.get('/login', async(req, res)=>{
    res.render('signup/login');
})

router.post('/login', passport.authenticate('local',
    {   
        failureRedirect: '/login',
        failureFlash: true
    }
  ), (req, res) => {
      req.flash('success', `Welcome Back ${req.user.username}!!`)
      res.redirect('/products');
});

router.get('/logout', async(req, res)=>{
    req.logout();
    req.flash('success', 'Log out successfuly. See you soon...');
    res.redirect('/products');
})

module.exports=router;
