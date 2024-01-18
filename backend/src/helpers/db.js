const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
let dbConnection;
module.exports = {
    connectToDb: (cb) => {
        mongoose.connect(process.env.MONGO_URL).then((client) => {
            dbConnection = client;
            return cb();
        }).catch(err => {
            console.log(err);
            return cb(err);
        });
    },
    getDb: () => dbConnection
};