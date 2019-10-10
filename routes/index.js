const express = require("express");
const router = express.Router();
const db = require("../models");

router.get("/", (req, res) => {
    db.News.find({}).then((articles) => {
        res.render("index", {articles: articles})
    })
});


module.exports = router;