const Joi = require("joi");
const boolean = require("joi/lib/types/boolean");
const mongoose = require("mongoose");

const product = mongoose.model(
    "Products",
    new mongoose.Schema({
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 255,
        },

        barcode: {
            type: String,
            required: true,
            min: 2,
            max: 255,
        },
        brand: {
            type: String,
            required: true,
            min: 2,
            max: 255,
        },
        description: {
            type: String,
            required: false,
            min: 2,
            max: 255,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
            max: 10000,
        },
        available: {
            type: Boolean,
            required: true,
        },
    })
);

function validateProduct(product) {
    const schema = {
        name: Joi.string().min(2).max(255).required(),
        barcode: Joi.string().min(2).max(255).required(),
        brand: Joi.string().min(2).max(255).required(),
        description: Joi.string().min(2).max(255).required(),
        price: Joi.number().min(0).max(1000000).required(),
        available: Joi.boolean().required(),
    };

    return Joi.validate(product, schema);
}

exports.Product = product;
exports.validate = validateProduct;