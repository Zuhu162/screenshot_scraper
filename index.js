const express = require("express");
const puppeteer = require("puppeteer");
const fs = require("fs");
const nodemailer = require("nodemailer");
const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(cors());

app.use(express.json());

const port = process.env.PORT;
console.log(process.env.Email);

var transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: process.env.Email,
    pass: process.env.Password,
  },
});

//parameters
//time interval, amount, site, width(default 1920), height(default 1080), fullpage(boolean), email, format(default png)
app.post("/", cors(), (req, res) => {
  const timeInterval = req.body.timeInterval * 60000;
  const amount = req.body.amount;

  const screenshotter = () => {
    const title = `${req.body.site[13]}_${Date.now()}.${
      req.body.format || "png"
    }`;

    (async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(req.body.site, {
        waitUntil: "networkidle2",
      });
      await page.setViewport({
        width: req.body.width || 1920,
        height: req.body.height || 1080,
        deviceScaleFactor: 1,
      });
      await page.screenshot({
        path: title,
        fullPage: req.body.fullpage || false,
      });

      await browser.close();

      var mailOptions = {
        from: process.env.Email,
        to: req.body.email,
        subject: "Screenshotter",
        text: title,
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
  };

  screenshotter();

  let counter = 1;

  if (counter < amount) {
    let looper = setInterval(() => {
      counter++;
      screenshotter();

      if (counter >= amount) {
        clearInterval(looper);
      }
    }, timeInterval);
  }

  res.send("email sent");
});

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, console.log(`App running on port: ${port}`));
