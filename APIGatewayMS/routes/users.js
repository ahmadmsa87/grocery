const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const config = require("config");
const fetch = require("node-fetch");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.post("/register", async(req, res) => {
    try {
        const url = config.get("UsersMSUrl") + "/register";
        const apiResponse = await fetch(url, {
            method: "post",
            body: JSON.stringify(req.body),
            headers: { "Content-Type": "application/json" },
        });

        const apiResponseJson = await apiResponse.json();
        return res.status(apiResponse.status).send(apiResponseJson);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ errorMessage: "Unknown error!" });
    }
});

module.exports = router;