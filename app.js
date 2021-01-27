const express = require("express");
const app = express();
const path = require("path");
// const ejs = require("ejs");

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.get("/", function () {
  res.sendFile(path.join(__dirname + "index.html"));
});

app.listen(port, function () {
  console.log("Server started successfully");
});
