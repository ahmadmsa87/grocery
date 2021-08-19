const mongoose = require("mongoose");
const express = require("express");
const fetch = require("node-fetch");
const config = require("config");

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const router = express.Router();

router.get("/:search", [auth], async(req, res) => {
    try {
        const url =
            config.get("productsMSUrl") +
            "/" +
            req.params.search +
            "?page" +
            req.query.page;
        const apiResponse = await fetch(url, {
            method: "get",
        });

        const apiResponseJson = await apiResponse.json();
        return res.status(apiResponse.status).send(apiResponseJson);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ errorMessage: "Unknown error!" });
    }
});

router.post("/", [auth, admin], async(req, res) => {
    if (Array.isArray(req.body) && req.body.length > 0) {
        try {
            const url = config.get("productsMSUrl") + "/";
            const apiResponse = await fetch(url, {
                method: "post",
                body: JSON.stringify(req.body),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const apiResponseJson = await apiResponse.json();
            return res.status(apiResponse.status).send(apiResponseJson);
        } catch (error) {
            console.log(error);
            return res.status(500).send({ errorMessage: "Unknown error!" });
        }
    }
    res.status(400).send({ errorMessage: "the list of products has an issue." });
});

router.post("/review", [auth], async(req, res) => {
    try {
        const url = config.get("productsMSUrl") + "/review";
        const body = req.body;
        body.userId = req.user._id;
        const apiResponse = await fetch(url, {
            method: "post",
            body: JSON.stringify(req.body),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const apiResponseJson = await apiResponse.json();
        return res.status(apiResponse.status).send(apiResponseJson);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ errorMessage: "Unknown error!" });
    }
});

module.exports = router;