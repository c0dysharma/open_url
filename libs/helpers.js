const cheerio = require("cheerio");

module.exports = {
  allHtml: async function (page) {
    return cheerio.load(
      await page.evaluate(() => {
        return document.querySelector("*").outerHTML;
      })
    );
  },

  sleep: function (seconds) {
    seconds = seconds * 1000;
    return new Promise((resolve) => setTimeout(resolve, seconds));
  },

};
