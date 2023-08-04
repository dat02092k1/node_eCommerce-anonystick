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
    checkOverload();

countConnect();
// init routes
app.get('/', (req, res, next) => {
    const strCompress = 'Heh fapcist'; 

    return res.status(200).json(
        { message: 'heh node',
        metadata: strCompress.repeat(10000) }
    );
})
// handle errors

module.exports = app 