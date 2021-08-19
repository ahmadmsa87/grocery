const Joi = require("joi");
const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 255,
    },

    review: {
        type: String,
        required: true,
        min: 2,
        max: 255,
    },
    productId: {
        type: String,
        required: true,
        min: 2,
        max: 255,
    },
});

const Review = mongoose.model("Review", reviewSchema);

function validateReview(review) {
    const schema = {
        name: Joi.string().min(2).max(255).required(),
        review: Joi.string().min(2).max(255).required(),
        productId: Joi.string().min(2).max(255).required(),
    };

    return Joi.validate(review, schema);
}

exports.Review = Review;
exports.validateReview = validateReview;