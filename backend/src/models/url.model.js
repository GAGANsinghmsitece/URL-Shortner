const mongoose = require("mongoose");

var UrlModel = mongoose.model("Url",
    new mongoose.Schema({
        originalUrl: {
            type: String,
            required: true,
        },
        shortUrl: {
            type: String,
            required: true
        },
        visits: {
            type: Number,
            required: true,
            default: 0
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    })
);

module.exports = { UrlModel };