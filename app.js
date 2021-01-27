const express = require("express");
const app = express();
const path = require("path");
// const ejs = require("ejs");

app.set("view engine", "html");

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile("index.html");
});

app.listen(port, function () {
  console.log("Server started successfully");
});
