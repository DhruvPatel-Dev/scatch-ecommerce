const express = require("express");
const app = express();
require('dotenv').config();
const path = require('path');
const session = require('express-session')
const cookieParser = require("cookie-parser");
const db = require("./config/mongoose-connection");
const usersRouter = require('./routes/usersRouter');
const ownersRouter = require('./routes/ownersRouter');
const productsRouter = require('./routes/productsRouter');
const indexRouter = require('./routes/index');
const flash = require('connect-flash');

app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
}))


app.use(flash());
app.use(express.json());
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));





app.use('/owners',ownersRouter);
app.use('/users',usersRouter);
app.use('/products',productsRouter);
app.use('/',indexRouter);
app.listen(process.env.PORT||3000,(err)=>{
    if(err) console.log(err)
});