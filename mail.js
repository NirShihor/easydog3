require("dotenv").config();
const express = require("express");
const app = express();
const session = require("express-session");
const flash = require("connect-flash");
const bodyParser = require("body-parser"); //Once everything is working check if required here
const DOMAIN = "easydog.co.uk";

const api_key = process.env.API_KEY;

// For Mailgun
const mailgun = require("mailgun-js");

const mg = mailgun({
  apiKey: api_key,
  domain: DOMAIN,
  host: "api.eu.mailgun.net", //this is required when in Europe or else will not send and will get a 'forbidden' error 401
});

const mailSession = app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

exports.mailSession = mailSession;

app.use(flash());

// function sendMessage() {
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  next();
});
// }

// exports.sendNewMessage = sendMessage;

app.use(bodyParser.urlencoded({ extended: false })); //Once everything is working check if required here

// Creater a function here that can be passed to post request in app.js
function sendMail(req, res) {
  const data = {
    name: req.body.name,
    from: req.body.email,
    subject: "A message from your website",
    to: "info@easydog.co.uk",
    text: req.body.message,
  };
  console.log("and here");

  mg.messages().send(data, function (err, body) {
    if (err) {
      console.log(err);
    }
    console.log(body);
  });

  console.log(data);
  req.flash(
    "success_msg",
    "Your message has been received and a reply will be sent shortly."
  );

  console.log("and also here");

  res.redirect("contact");
}

exports.sendMail = sendMail;

console.log("here");
