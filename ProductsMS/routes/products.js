const { Product, validate } = require("../models/product");
const { Review, validateReview } = require("../models/review");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/:search", async(req, res) => {
    try {
        const page = parseInt(req.query.page);
        const PAGE_SIZE = 20;
        const searchPattern = new RegExp("^.*" + req.params.search + ".*$");

        console.log("searchPattern", searchPattern);
        let product = await Product.aggregate([{
                $match: { name: searchPattern },
            },
            {
                $project: {
                    _id: {
                        $toString: "$_id",
                    },
                    name: {
                        $toString: "$name",
                    },
                    barcode: {
                        $toString: "$barcode",
                    },
                    brand: {
                        $toString: "$brand",
                    },
                    description: {
                        $toString: "$description",
                    },
                    price: {
                        $toString: "$price",
                    },
                    available: {
                        $toString: "$available",
                    },
                },
            },
            {
                $lookup: {
                    from: "reviews",
                    localField: "_id",
                    foreignField: "productId",

                    as: "reviews",
                },
            },
            { $skip: (page - 1) * PAGE_SIZE },
            { $limit: PAGE_SIZE },
            { $sort: { name: -1 } },
        ]);
        return res.send({
            totalCount: product.length,
            products: product,
        });
    } catch (e) {
        console.log("searchPattern", e);
        return res.status(500).json(e);
    }
});

router.post("/", async(req, res) => {
    if (Array.isArray(req.body) && req.body.length > 0) {
        let errors = [];
        req.body.forEach(async(item) => {
            const { error } = validate(item);
            if (error) errors.push(error.details[0].message);
            else {
                const product = new Product({
                    name: item.name,
                    barcode: item.barcode,
                    brand: item.brand,
                    description: item.description,
                    price: item.price,
                    available: item.available,
                });
                await product.save();
            }
        });
        if (errors.length > 0) res.status(400).send({ errors: errors });
        res.send(req.body);
    }
    res.status(400).send({ errorMessage: "the list of products has an issue." });
});

router.post("/review", async(req, res) => {
    const { error } = validateReview(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const product = await Product.findById(req.body.productId);
    if (!product) return res.status(400).send("Invalid product.");

    let review = new Review({
        name: req.body.name,
        review: req.body.review,
        productId: req.body.productId,
    });

    try {
        await review.save();

        res.send(review);
    } catch (ex) {
        res.status(500).send("Something failed.");
    }
});

module.exports = router;