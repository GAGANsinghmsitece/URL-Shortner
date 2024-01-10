const { URL } = require("url");
const { nanoid } = require("nanoid");
const { isUserValid } = require("./user.controller");
const { UrlModel } = require("../models/url.model");

const shortURLController = async (req, res) => {
    try {
        const { url } = req?.body;
        const { userId } = req?.headers;
        if (!url || !userId) {
            throw new Error(
                "url is required"
            );
        }
        const isValidUrl = new URL(url);

        const urlShortener = new UrlModel({
            originalUrl: url,
            shortUrl: nanoid(25),
            visits: 0,
            user: userId
        });

        const savedUrl = await urlShortener.save();

        res.status(201).json({
            success: true,
            message: "URLcreated successfully",
            key: savedUrl.shortUrl,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

const getAllUrls = async (req, res) => {
    try {
        const { userId } = req.headers.userId;
        const urls = await UrlModel.find({ "user.id": userId }, { originalUrl: 1, shortUrl: 1, visits: 1, createdAt: 1, _id: 1 }).sort({ createdAt: -1 });
        res.status(200).json({
            "success": true,
            "urls": urls
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            "success": false,
            "message": err.message
        });
    }
}

const getOriginalUrlController = async (req, res) => {
    try {
        const { hash } = req.query;
        if (!hash) {
            throw new Error("Hash is required");
        }
        const updatedUrl = await UrlModel.findOneAndUpdate({
            shortUrl: hash
        },
            {
                $inc: {
                    visits: 1
                }
            }
        );
        res.status(200).json({
            "success": true,
            "url": updatedUrl.originalUrl
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            "success": false,
            "message": err.message
        });
    }
}

module.exports = {
    shortURLController,
    getAllUrls,
    getOriginalUrlController
};