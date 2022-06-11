const express = require("express");
const puppeteer = require("puppeteer");
const fs = require("fs");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
app.use(express.json());

const port = process.env.PORT;
console.log(process.env.Email);

app.get("/", (req, res) => {
  res.send("Hello world");
});

var transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: process.env.Email,
    pass: process.env.Password,
  },
});

app.post("/", (req, res) => {
  const timeInterval = req.body.timeInterval;
  const amount = req.body.amount;

  let counter = 0;

  let looper = setInterval(() => {
    const title = `${req.body.site[13]}_${Date.now()}.jpg`;
    counter++;

    (async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(req.body.site);
      await page.screenshot({
        path: title,
      });
      await browser.close();

      var mailOptions = {
        from: process.env.Email,
        to: req.body.email,
        subject: "Sending Email using Node.js",
        text: "That was easy!",
        attachments: [
          {
            filename: title,
            path: title,
          },
        ],
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }

        fs.unlink(title, (err) => {
          if (err) {
            console.error(err);
          }
        });
      });
    })();

    if (counter >= amount) {
      clearInterval(looper);
    }
  }, timeInterval);

  res.send("email sent");
});

app.listen(port, console.log(`App running on port: ${port}`));
