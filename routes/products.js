const express = require('express');
const router = express.Router();
const Products = require('../model/product')
const Review = require('../model/reviews')
const {isLoggedIn} = require('../middleware')

// Show all the products
router.get('/', async(req, res)=>{
    try{
        const prod = await Products.find({});
        res.render('products/show', {prod});
    }
    catch(e){
        res.redirect('/error')
    }
})
router.get('/products', async(req, res)=>{
    try{
        const prod = await Products.find({});
        res.render('products/show', {prod});
    }
    catch(e){
        res.redirect('/error')
    }
})

router.get('/products/men', async(req, res)=>{
    const prod = await Products.find({});
    res.render('products/men', {prod});
})

router.get('/products/women', async(req, res)=>{
    const prod = await Products.find({});
    res.render('products/women', {prod});
})

router.get('/products/kids', async(req, res)=>{
    const prod = await Products.find({});
    res.render('products/kids', {prod});
})


// Add new product
router.get('/products/new', (req, res)=>{
    res.render('products/new');
})
router.post('/products/new', async(req, res)=>{
    await Products.create(req.body);
    req.flash('success', 'Product added successfuly')
    res.redirect('/products')
})

// Show a particular product
router.get('/products/:id', async(req, res)=>{
    const {id}=req.params;
    const prod= await await Products.findById(id).populate('reviews');
    res.render('products/item', {prod});
})

// Edit a particular product
router.get('/products/:id/edit', async(req, res)=>{
    const {id} = req.params;
    const prod = await Products.findById(id);
    res.render('products/edit', {prod});
})
router.patch('/products/:id/edit', async(req, res)=>{
    const {id} = req.params;
    await Products.findByIdAndUpdate(id, req.body);
    req.flash('success', 'Updated Successfuly')
    res.redirect(`/products/${id}`)
})

// Delete a particular product
router.delete('/products/:id', async(req, res)=>{
    const {id} = req.params;
    const p = await Products.findByIdAndDelete(id);
    req.flash('success', `Deleted product ${p.subtitle} successfuly`)
    res.redirect('/products');
})


// Reviews display
router.post('/products/:id/review', isLoggedIn, async(req, res)=>{
    try{
        const product = await Products.findById(req.params.id);
        // const review = new Review(req.body);
        const review = new Review({
            user: req.user.username, 
            ...req.body
        });
        product.reviews.push(review);
        await review.save();
        await product.save();
    
        res.redirect(`/products/${req.params.id}`)
    }
    catch(e){
        console.log(e)
        res.redirect('/error')        
    }
})


// REView deletion
router.delete('/products/:prodid/review/:reviewid',isLoggedIn, async(req, res)=>{
    const prodid = req.params.prodid;
    const id = req.params.reviewid;
    await Products.findByIdAndUpdate(prodid, {$pull: {reviews : id} });
//     console.log(userid);
    res.redirect(`/products/${req.params.prodid}`)
})

module.exports=router;