const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validate } = require("../models/user");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.post("/register", async(req, res) => {
    const { error } = validate(req.body);
    if (error)
        return res.status(400).send({ errorMessage: error.details[0].message });
    console.log(req.body);
    let user = await User.findOne({ email: req.body.email });
    if (user)
        return res.status(400).send({ errorMessage: "User already registered." });

    user = new User(
        _.pick(req.body, ["name", "email", "password", "gender", "phone", "role"])
    );
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    user.isAdmin = req.body.role && req.body.role === "admin";
    await user.save();

    const token = user.generateAuthToken();
    return res
        .header("x-auth-token", token)
        .send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;