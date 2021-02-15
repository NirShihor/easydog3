require("dotenv").config();
const express = require("express");
const app = express();
const session = require("express-session");
const path = require("path");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const mail = require("./mail"); //use mail.js file - sending mail through contact fortm
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

mailSend = mail.sendMail; //Function parameters in mail.js from form (contact.ejs) for post request below

// TEMP
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
app.use(mail.mailSession); //This passes the session from mail.js as without it throws an error re flash requiring sessions
app.use(flash());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(expressLayouts);
app.use(express.static("public"));
sendAMessage = mail.sendNewMessage;

app.set("views", path.join(__dirname, "views")); //This should maybe be deleted
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.get("/whyEasyDog", function (req, res) {
  res.render("whyEasyDog");
});

app.get("/testimonials", function (req, res) {
  res.render("testimonials");
});

app.get("/services", function (req, res) {
  res.render("services");
});

app.get("/contact", function (req, res) {
  res.render("contact");
});

app.post("/contact", mailSend);

app.listen(port, function () {
  console.log("Server started successfully on port", port);
});
