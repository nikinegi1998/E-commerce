const mongoose = require('mongoose');
const Products = require('./product')
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema= new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    usertype:{
        type: String,
        required: true
    },
    cart:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products'
    }]
})

userSchema.plugin(passportLocalMongoose);
const User = mongoose.model('User', userSchema);

module.exports = User;
