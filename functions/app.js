const express = require("express");
const serverless = require("serverless-http");

const chromium = require("chrome-aws-lambda");
const puppeteer = require("puppeteer-core");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send({
    Path: "Home",
  });
});

app.get("/test", (req, res) => {
  res.send({
    Path: "/test",
    Name: "Kuldeep Sharma",
  });
});

app.post("/getHtml", async (req, res) => {
  const url = req.body.url;

  const browser = await puppeteer.launch({
    args: chromium.args,
    executablePath:
      process.env.CHROMIUM_PATH || (await chromium.executablePath),
    headless: true,
    slowMo: 250
  });

  const page = await browser.newPage();
  await page.goto(url);
  const html = await page.evaluate(() => document.querySelector("*").outerHTML);
  const title = await page.title();
  const respUrl = page.url()

  console.log(page);
  res.send({
    url: respUrl,
    title,
    html: JSON.stringify(html),
  });
  await browser.close();
});

module.exports.handler = serverless(app);
