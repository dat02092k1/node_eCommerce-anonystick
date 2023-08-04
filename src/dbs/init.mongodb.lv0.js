"use strict";

const mongoose = require("mongoose");

const connectString = "mongodb://localhost:27017/shop_ecommerce";

mongoose.connect(connectString)
        .then((_) => console.log("DB connected"))
        .catch((err) => console.log('Error connect'));

// dev
if (1 === 1) {
    mongoose.set('debug', true);
    mongoose.set('debug', { color: true }); 
}