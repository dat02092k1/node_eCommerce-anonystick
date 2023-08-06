require('dotenv').config;
const express = require('express');
const app = express(); 
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');

// init middleware
// app.use(morgan("dev"))  
app.use(helmet())
app.use(compression())
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// init db
require('./dbs/init.mongodb');
const {countConnect, checkOverload} = require('./helpers/check.connect');

// init routes
app.use('/', require('./routes'))

// handle errors
app.use((error, req, res, next) => {
    const statusCode = error.status || 500; 

    return res.status(statusCode).json({
        status: 'error',
        code: statusCode,
        message: error.message || 'Internal Server Error'
    })
});
module.exports = app 