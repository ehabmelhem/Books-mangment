const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://ehab:8zNEmazWN1x4dooV@cluster0.fw8eo.mongodb.net/Book_Market",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("we are connected to DB");
});

const book_Schema = new mongoose.Schema({
  name: String,
  author_name: String,
  year: Number,
});
const Books_model = mongoose.model("Books", book_Schema);

exports.removeBook = async (req, res) => {
  const { name, author_name, year } = req.body;
  await Books_model.remove({
    name: name,
    author_name: author_name,
    year: year,
  });
  res.send({ index: 1 });
};

exports.searchByname = async (req, res) => {
  const { name } = req.body;
  await Books_model.find({ name: name }).then((data) => {
    if (data.length === 0) {
      res.send({ index: -1 });
    } else {
      res.send({ data: data, index: 1 });
    }
  });
};
exports.serachByauthor = async (req, res) => {
  const { author } = req.body;
  await Books_model.find({ author_name: author }).then((data) => {
    if (data.length === 0) {
      res.send({ index: -1 });
    } else {
      res.send({ data: data, index: 1 });
    }
  });
};

exports.addBook = async (req, res) => {
  const { book_name, author_name, year } = req.body;
  try {
    await Books_model.find({
      name: book_name,
      author_name: author_name,
      year: year,
    }).then(async (docs) => {
      if (docs.length !== 0) {
        res.send({ index: -1 });
      } else {
        var add = new Books_model({
          name: book_name,
          author_name: author_name,
          year: year,
        });
        await add.save().then(() => {
          console.log("add new book to the db");
        });
        res.send({ index: 1 });
      }
    });
  } catch (e) {
    res.send({ error: e, index: -1 });
  }
};
