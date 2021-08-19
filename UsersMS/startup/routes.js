const express = require("express");
const fileUpload = require("express-fileupload");
const users = require("../routes/users");

const error = require("../middleware/error");

module.exports = function(app) {
    // enable files upload
    app.use(fileUpload());
    app.use(express.json());

    app.use("/api/users", users);

    app.use(error);
};