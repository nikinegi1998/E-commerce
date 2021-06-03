if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

// Requiring the modules
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const seedDb = require('./seed');
const session = require('express-session');
const flash = require('connect-flash');
const User = require('./model/user');
const passport = require('passport');
const LocalStrategy= require('passport-local');
const methodOverride = require('method-override');

const prodRoutes = require('./routes/products');
const authRoutes = require('./routes/user_auth');
const cartRoutes = require('./routes/cart');

// calling seedDb for products
// seedDb();

// Middlewares
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
app.use(express.static( path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));


// Connect Db
mongoose.connect(process.env.DB_URL, 
{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex:true
})
    .then(()=>{
        console.log("DB connected");
    })
    .catch((e)=>{
        console.log(e.message);
    })

 

const sessionConfig ={
    secret :'weneedbettersecret',
    resave: false,
    saveUninitialized: true
}

app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());


passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next)=>{
    res.locals.success =req.flash('success');
    res.locals.error =req.flash('error');
    res.locals.currentUser = req.user;
    next();
})

   
// All the routes
app.use(prodRoutes);
app.use(authRoutes);
app.use(cartRoutes);

app.get('/error', (req,  res)=>{
    res.render('error');
})

app.get('*', (req, res)=>{
    res.render('error');
})

app.listen(process.env.PORT || 3000, ()=>console.log("Server connected at port 3000"))