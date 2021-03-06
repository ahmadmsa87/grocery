const express = require("express");
const fileUpload = require("express-fileupload");
const products = require("../routes/products");
const users = require("../routes/users");
const auth = require("../routes/auth");
const error = require("../middleware/error");

module.exports = function(app) {
    // enable files upload
    app.use(fileUpload());
    app.use(express.json());
    app.use("/api/products", products);
    app.use("/api/users", users);
    app.use("/api/auth", auth);
    app.use(error);
};