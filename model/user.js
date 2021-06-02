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

// email: 'niki@gmail.com',  user: 'niki',  pwd: '1234',  usertype: 'customer'
//  email: 'anu@gmail.com',  user: 'anu',  pwd: '1234',  usertype: 'customer'
//  email: 'abc@gmail.com',  user: 'abc',  pwd: '1234',  usertype: 'customer'
//  email: 'shreya@gmail.com',  user: 'shreya',  pwd: '12345',  usertype: 'customer'
//  email: 'admin@gmail.com', username: 'admin', password: '9876', usertype: 'seller'
//  email: 'admin1@gmail.com',  username: 'admin1',   password: '9876', usertype: 'customer'
// email: 'admin2@gmail.com',  username: 'admin2', password: '9876',    usertype: 'seller'  