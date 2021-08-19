const config = require("config");
const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024,
    },
    gender: {
        type: String,
        required: false,
        minlength: 1,
        maxlength: 10,
    },
    phone: {
        type: String,
        required: false,
        minlength: 5,
        maxlength: 20,
    },
    role: {
        type: String,
        required: false,
        minlength: 5,
        maxlength: 20,
    },
    isAdmin: Boolean,
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin },
        config.get("jwtPrivateKey")
    );
    return token;
};

const User = mongoose.model("User", userSchema);

exports.User = User;