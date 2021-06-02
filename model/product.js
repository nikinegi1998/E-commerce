const mongoose = require('mongoose');
const Review = require('../model/reviews')

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    img:{
        type:String,
        required: true
    },
    subtitle: {
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    offers:{
        type: String
    },
    desc:{
        type: String
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }]
})

const Products = mongoose.model('Products', productSchema);

module.exports = Products;