const express = require('express');
const app = express();
require('dotenv').config({path:"./vars/.env"});
const hbs = require('express-handlebars')
const PORT = process.env.PORT || 4000;
const route = require('./routes');
const path = require('path');
const logger = require('morgan');
const chalk = require('chalk');
const mongoose = require('./config/connection');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const creatHttpErrors = require('http-errors');

const passport = require('passport')
const initialize = require('./config/passport')
const session = require('express-session')
initialize(passport)

app.use(session({
    secret:process.env.SECRET_KEY,
    resave:true,
    saveUninitialized:true
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(logger('dev'))
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}))
app.use(route)

app.set('views', path.join(__dirname,'/views'))
app.set('view engine','hbs')
app.engine('hbs',hbs.engine({
    extname:"hbs",
    layoutsDir:__dirname+'/views/layout',
    defaultLayout:"mainLayout",
    partialsDir:__dirname+'/views/partials'
}))
app.use(express.json())
app.use(express.urlencoded({ extended:true }))
app.use(express.static(path.join(__dirname, 'public')))



app.use(function(req,res,next){
    res.status(404);
    res.render('404',{url:req.url});
    return;
})

app.listen(PORT, (err)=>{
    if(err) console.log(err);
    console.log(`${chalk.green('server started listening on PORT : ')}${chalk.blue(`${PORT}`)}`)
})

module.exports = app