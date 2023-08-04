"use strict";

const { log } = require("console");
const mongoose = require("mongoose");
const os = require("os");
const process = require("process");

const _SECONDS = 5000;
// count the number of connections
const countConnect = () => {
  const numConnections = mongoose.connections.length;
  console.log("number of connections:", numConnections);
};

/**
 * check overload connections
 */
const checkOverload = () => {
  setInterval(() => {
    const numConnections = mongoose.connections.length;
    const numCores = os.cpus.length;
    const memoryUsage = process.memoryUsage().rss;

    // example maxcimum connections
    const maxConnections = numCores * 5;

    console.log('Active connections:', numConnections);
    console.log('memory usage: ' + memoryUsage/1024/1024);

    if(numConnections > maxConnections) {
        console.log("connections overload connected");
        // notify.send(); ..........  
    }

  }, _SECONDS); // monitor each 5 minutes
};

module.exports = {
  countConnect, checkOverload
};
