const express = require("express");
require("dotenv").config();
const { connectToDb, getDb } = require("./src/helpers/db");
const { userRouter } = require("./src/routes/user.routes");
const { urlRouter } = require("./src/routes/url.router");
const { CORSMiddleware } = require("./src/middlewares/cors.middleware");

const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(CORSMiddleware);
app.use("/users", userRouter);
app.use("/urls", urlRouter);


let db;

connectToDb((err) => {
    if (!err) {
        app.listen(process.env.PORT || 8080, () => {
            console.log("Server is live on port 8080");
        })
        db = getDb();
    }
});