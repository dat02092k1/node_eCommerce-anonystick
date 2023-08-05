require('dotenv').config;
const express = require('express');
const app = express(); 
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');

// init middleware
app.use(morgan("dev"))  
app.use(helmet())
app.use(compression())
    // morgan("compile")
    // morgan("common")
    // morgan("short")
    // morgan("tiny");
// init db
require('./dbs/init.mongodb');
const {countConnect, checkOverload} = require('./helpers/check.connect');

// init routes
app.use('/', require('./routes'))
// handle errors

module.exports = app 