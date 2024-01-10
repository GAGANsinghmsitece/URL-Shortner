const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");
const sendUnauthorizedMessage = (res, message) => {
    res.status(401).json({
        "success": false,
        "message": message
    });
}
const verifyToken = async (req, res, next) => {
    try {
        if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            const tokenDetails = jwt.verify(req.headers.authorization.split(' ')[1], process.env.API_SECRET);
            const { id } = tokenDetails;
            if (!id) {
                sendUnauthorizedMessage(res, "Invalid token");
            }
            const user = await UserModel.findOne({ _id: id });
            if (!user) {
                sendUnauthorizedMessage(res, "Invalid token");
            }
            req.headers.userId = id;
            next();
        } else {
            sendUnauthorizedMessage(res, "Unauthorized Access");
        }
    } catch (err) {
        sendUnauthorizedMessage(res, "Unauthorized Access");
    }
}

module.exports = { verifyToken };