'use strict'

const mongoose = require('mongoose')
const os = require('os')
const process = require('process')
const _SECONDS = 36000

// count connect
const countConnect = () => {
    const numConnection = mongoose.connections.length
    console.log(`Number of connection::${numConnection}`);
}

// check over load
const checkOverload = () => {
    setInterval( () => {
        const numConnection = mongoose.connections.length
        const numCores = os.cpus().length
        const memoryUsage = process.memoryUsage().rss
        // Example maximum number of connects based on number of core
        const maxConnections = numCores * 5

        console.log(`Number of cores:: ${numCores}`);
        console.log(`Active connections:: ${numConnection}`);
        console.log(`Memory usage:: ${memoryUsage / 1024 / 1024} MB`);

        if(numConnection > maxConnections){
            console.log(`Connection overload detect`);
        }

    }, _SECONDS) // Monitor every 5 seconds
}

module.exports = {
    countConnect,
    checkOverload
}