'use strict'

const mongoose = require('mongoose')
const { db: { connectionString } } = require('../configs/config.mongodb')
const { countConnect, checkOverload } = require('../helper/check.connect')

console.log("🚀 ~ file: init.mongodb.js:5 ~ connectionString:", connectionString);

class Database {

    constructor(){
        this.connect()
    }

    // connect
    connect(type = 'mongodb') {
        if(1 === 1){
            mongoose.set('debug', true)
            mongoose.set('debug', { color: true })
        }

        mongoose.connect(connectionString, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
        })
        .then( _ => console.log(`Connected to MongoDb`, countConnect() ))
        .catch( err => console.log(`Error Connect`))
    }

    static getInstance() {
        if(!Database.instance){
            Database.instance = new Database()
        }

        return Database.instance
    }
}

const instanceMongodb = Database.getInstance()

module.exports = instanceMongodb