const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../middleware');
const Products = require('../model/product');
const User = require('../model/user');


router.get('/user/:userId/cart',isLoggedIn,async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate('cart');
        res.render('cart/showCart', { userCart: user.cart });
    }
    catch (e) {
        req.flash('error', `Unable to Add this product ${e.message}`);
        console.log(e.message);
        res.render('error');
    }
})

router.post('/user/:id/cart', isLoggedIn, async(req, res)=>{
    try {
        const prod = await Products.findById(req.params.id);

        const user = req.user;

        user.cart.push(prod);

        await user.save();
        req.flash('success', 'Added to cart successfully')
        res.redirect(`/user/${req.user._id}/cart`);
    }
    catch (e) {
        req.flash('error', 'Unable to get the cart at this moment');
        res.redirect(`/user/${req.user._id}/cart`);
    }
})

router.delete('/user/:userid/cart/:id', async(req, res)=>{
    const userid = req.params.userid;
    const id = req.params.id;
    await User.findByIdAndUpdate(userid, {$pull: {cart : id} });
//     console.log(userid);
    res.redirect(`/user/${req.user._id}/cart`);
})


module.exports = router;