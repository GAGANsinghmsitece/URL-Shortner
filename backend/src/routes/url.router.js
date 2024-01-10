const express = require("express");
const { verifyToken } = require("../middlewares/verifyToken.middleware");
const { shortURLController, getAllUrls, getOriginalUrlController } = require("../controllers/url.controller");
const { CORSMiddleware } = require("../middlewares/cors.middleware");
const urlRouter = express.Router();

urlRouter.post("/short", verifyToken, shortURLController);
urlRouter.get("/list", verifyToken, getAllUrls);
urlRouter.get("/original", getOriginalUrlController);

module.exports = {
    urlRouter
};