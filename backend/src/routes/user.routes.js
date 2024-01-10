const express = require("express");
const { createUserController, getAllUsers, loginController } = require("../controllers/user.controller");
const { verifyToken } = require("../middlewares/verifyToken.middleware");
const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.post("/login", loginController);
userRouter.post("/signup", createUserController);
userRouter.get("/hidden", verifyToken, (req, res) => {
    res.status(200).json({
        "success": true
    });
});

module.exports = {
    userRouter
};