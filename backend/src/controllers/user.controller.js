const { UserModel } = require("../models/user.model");
const { connectToDb, getDb } = require("../helpers/db");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const isUserExistsByEmail = async (email) => {
    try {
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            return false;
        }
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}

const createUserController = async (req, res) => {
    try {
        const { email, password } = req?.body;
        if (!email || !password) {
            throw new Error("Email and Password are required");
        }
        const isUserExists = await isUserExistsByEmail(email);
        if (isUserExists) {
            throw new Error("User Already Exists!!");
        }
        const hashPassword = bcrypt.hashSync(password, 8);
        const user = new UserModel({
            email,
            password: hashPassword
        });
        const isCreated = await user.save();
        res.status(201).json({
            success: true,
            message: "User created successfully"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find({}, { email: 1, _id: 0 });
        res.status(200).json({
            "success": true,
            "users": users
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            "success": false,
            "message": err.message
        });
    }
}

const loginController = async (req, res) => {
    try {
        const { email, password } = req?.body;
        if (!email || !password) {
            throw new Error("Email and Password are required");
        }
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            throw new Error("User doesn't exist");
        }
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                "success": false,
                "message": "The password is incorrect"
            });
        }
        const token = jwt.sign({
            id: user.id
        }, process.env.API_SECRET, { expiresIn: 86400 });
        res.status(201).json({
            success: true,
            message: "Logged In successfully",
            token
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

const isUserValid = async (id) => {
    try {
        const user = await UserModel.findOne({ _id: id });
        if (!user) {
            return false;
        }
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}




module.exports = {
    createUserController,
    getAllUsers,
    loginController,
    isUserValid
};