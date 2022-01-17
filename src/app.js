const dotenv = require("dotenv");
const express = require("express");
const mongoose = require('mongoose');
const app =express();

dotenv.config({path: './config.env'});
require('./db/conn');

const PORT = process.env.PORT ;

//const User = require('./model/userSchema');

app.use(express.json());

//we link the router files to make our route easy 
app.use(require('./router/auth'));


// Middleware
 
const middleware = (req,res, next) =>{
 console.log('hello middleware');
 next();
}


// app.get("/",(req,res)=>{
//     res.send(" hello from Api ")

// });

app.get("/about", middleware,(req,res)=>{
    res.send(" hello from about ");

});

app.get("/login",(req,res)=>{
    res.send(" hello from login ");

});
app.get("/signin",(req,res)=>{
    res.send(" hello from signin ");

});
app.listen(PORT, ()=>{
    console.log('server is running at port: 3000' );
})