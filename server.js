const express = require("express");
const bodyParser = require("body-parser");
const router = require("./Router/book");
const app = express();

app.use(bodyParser.json());
app.use("/books", router);
app.use(express.static("app/build"));
const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log("listen on port: ", port);
});
