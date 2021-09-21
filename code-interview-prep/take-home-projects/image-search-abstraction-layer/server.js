require('dotenv').config()
const express = require("express");
const cors = require("cors");
const axios = require("axios").default;
const PouchDB = require("pouchdb");

const app = express();
const db = new PouchDB("db");

const CX = process.env.SEARCH_ENGINE_ID;
const KEY = process.env.CSE_API_KEY;

app.use(cors());
app.get("/", function (req, res) {
  res.send("Usage: `/query/:query[?page=number]`, `/recent`");
});

const recent = [];

app.get("/query/:query", (req, res) => {
  const query = req.params.query;

  const fetchResults = async () => {
    try {
      const response = await axios.get(
        "https://customsearch.googleapis.com/customsearch/v1",
        {
          params: {
            cx: CX,
            key: KEY,
            searchType: "image",
            q: query,
            start: req.query.page > 1 ? +(req.query.page + 1 - 10) : 1,
          },
        }
      );

      const results = response.data.items.map((item) => {
        return {
          type: item.fileFormat,
          width: item.image.width,
          height: item.image.height,
          size: item.image.byteSize,
          url: item.link,
          thumbnail: {
            url: item.image.thumbnailLink,
            width: item.image.thumbnailWidth,
            height: item.image.thumbnailHeight,
          },
          description: item.title,
          parentPage: item.image.contextLink,
        };
      });
      res.json(response.data);
    } catch (error) {
      console.log(error);
      res.json(error.response.data);
    }
  };

  fetchResults();
  recent.push(req.params.query);
  db.put({ _id: new Date().toISOString(), query }, (err, result) => {
    if (!err) {
      console.log("Added to db.");
    } else {
      console.log(err, result);
      res("Something went wrong.");
    }
  });
});

app.get("/recent", (req, res) => {
  const fetchRecent = async () => {
    const allDocs = await db.allDocs(
      { include_docs: true, descending: true },
      (err, doc) => {
        if (!err) {
          return doc.rows;
        } else {
          console.log(err);
          res("Something went wrong.")
        }
      }
    );

    const recentItems = allDocs.rows.map((item) => item.doc.query);
    res.json(recentItems);
  };
  fetchRecent();
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
