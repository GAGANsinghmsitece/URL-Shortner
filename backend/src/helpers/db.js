const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
let dbConnection;
module.exports = {
    connectToDb: (cb) => {
        mongoose.connect("mongodb://localhost:27017/url-shortener").then((client) => {
            dbConnection = client;
            return cb();
        }).catch(err => {
            console.log(err);
            return cb(err);
        });
    },
    getDb: () => dbConnection
};