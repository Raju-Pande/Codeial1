


const express = require("express");
// cookie insatll:  npm i cookie-parser

const cookieParser = require('cookie-parser')


const app = express();
const port = 8000;

// mpngpDb Conneected

const mongoose = require("mongoose");
const db = require('./config/mongoose')

// Used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/pasport-local-strategy')

// connection to monodb
const MongoStore =require("connect-mongo");

// SASS
const sassMiddleware=require("node-sass-middleware");

app.use(sassMiddleware({
    src:"./assets/scss",
    dest:'./assets/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'
}))

app.use(express.urlencoded({extended:true}));   //body-parser deprecated undefined extended: provide extended option

app.use(cookieParser());

// static file
app.use(express.static('./assets'))

// Creating a Layout
const expressLayouts=require('express-ejs-layouts');

app.use(expressLayouts);


// extract style and script fron sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


// set up view engine

app.set('view engine', 'ejs')
app.set('views', './views')

// Mongo Store is used to store the session cookie in the db
app.use(session({
    name: 'codeial',
    // TODO change the secret before deploy in production mode
    secret: "blahSomething",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    // conntection to mongodb
    store:MongoStore.create({
        mongoUrl:'mongodb://0.0.0.0:27017/Manual_Authenction',
        mongooseConnection: db,
        autoRemvoe: 'disabled'
    },
    function(err){
        console.log(err || 'connect-mongodb setup ok');
    }
    )
}));
app.use(passport.initialize());
app.use(passport.session());


// 
app.use(passport.setAuthenticatedUser)


// use exprss router here
app.use('/', require('./routes'));




app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running the server : ${err}`);
        return;
    }
    console.log(`Server is running on port: ${port}`);
})