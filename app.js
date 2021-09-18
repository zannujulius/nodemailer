// express middleware
const express = require("express");
const app = express();
// nodemailer
const nodemailer = require("nodemailer");
// templating engine ejs
const ejs = require("ejs");
// taking input from the client side using ejs
const bodyParser = require("body-parser");

// hiding your valuable varibles
require("dotenv").config();

app.use(express.json());

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));

// creating a trnasportator
let transporter = nodemailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",
  //  emailUser -> should be your gmail address
  //  emailPass ->  should be your gmail password
  auth: {
    user: processs.env.emailUser,
    pass: process.env.emailPass,
  },
  secure: true,
});

// test if your configuration worked
transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  }
});

// rendering the index page in the views directory
app.get("/", (req, res) => {
  res.render("index");
});

// handling the post request to send mail
app.post("/mail", (req, res) => {
  const { subject, email, content } = req.body;
  // creating a mail template
  const mailData = {
    from: email,
    to: "chevrtech@gmail.com",
    subject: subject,
    html: `<p> ${content}</p>`,
  };
  transporter.sendMail(mailData, (error, fail) => {
    if (error) {
      return console.log(error);
    } else {
      console.log("mail sent");
      res.end();
    }
  });
});

// incase your get an error log in intn your gmail and
// click on setting in the top right
// click on the grid like dot in the right
// click on account,
// on the tabs opened on the left right hand side click on the security
// scroll down a bit look out for Allow unsecure app:
// By default it should be turned off
// turn is on
// still logged into you browser click on the linnk below
// https://accounts.google.com/DisplayUnlockCaptcha
// Click on continue
// Everything should work fine

app.listen(2000, () => {
  console.log("sever started on port 2000");
});
