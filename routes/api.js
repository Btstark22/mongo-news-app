const express = require("express");
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");
const db = require("../models");
console.log(db);

router.get("/scrape", (req, res) => {
  axios.get("https://old.reddit.com/").then(function(response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    const $ = cheerio.load(response.data);

    // Now, we grab every h2 within an article tag, and do the following:
    $("a.title").each(function(i, element) {
      // Save an empty result object
      console.log($(this).text());
      const result = {};

      // Add the text and href of every link, and save them as properties of the result object
      result.title = $(this)
        .text();
      result.link = "https://www.reddit.com"+$(this)
        .attr("href");

      // Create a new Article using the `result` object built from scraping
      db.News.create(result)
        .then(function(dbArticle) {
          // View the added result in the console
          console.log(dbArticle);
        })
        .catch(function(err) {
          // If an error occurred, log it
          console.log(err);
        });
    });

    // Send a message to the client
    res.send("Scrape Complete");
  });
});

router.put("/api/news", () => {
  db.News.findOneAndUpdate({_id: req.body.id}, {$set: {saved: true}})
})

module.exports = router;