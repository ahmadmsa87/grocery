const Joi = require("joi");
const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    userId: {
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
    barcode: {
        type: String,
        required: true,
        min: 2,
        max: 255,
    },
    createdAt: {
        type: Date,
    },
});

const Review = mongoose.model("Review", reviewSchema);

function validateReview(review) {
    const schema = {
        userId: Joi.string().min(2).max(255).required(),
        review: Joi.string().min(2).max(255).required(),
        barcode: Joi.string().min(2).max(255).required(),
    };

    return Joi.validate(review, schema);
}

exports.Review = Review;
exports.validateReview = validateReview;