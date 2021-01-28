const express = require("express");
const app = express();
const path = require("path");
const ejs = require("ejs");

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.set("view-engine", "ejs");
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.render("index.ejs");
});

app.listen(port, function () {
  console.log("Server started successfully");
});
