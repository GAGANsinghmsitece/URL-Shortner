const mongoose = require("mongoose");

var UserModel = mongoose.model("User",
    new mongoose.Schema({
        email: {
            type: String,
            required: [true, "email not provided"],
            unique: [true, "email already exist"],
            lowercase: true,
            trim: true,
            validate: {
                validator: function (v) {
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
                },
                message: '{VALUE} is not a valid email!'
            }
        },
        password: {
            type: String,
            required: true
        },
    })
);

module.exports = { UserModel };