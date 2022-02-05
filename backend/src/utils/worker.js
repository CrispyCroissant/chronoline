const axios = require("axios");
const { parentPort } = require("worker_threads");
const { getArticleDates } = require("./article");

const wikipediaURL = "https://en.wikipedia.org/w/api.php";
let articles = [];

axios
  .get(wikipediaURL, {
    params: {
      format: "json",
      action: "query",
      generator: "random",
      grnlimit: 20,
      grnnamespace: 0,
      grnfilterredir: "nonredirects",
      prop: "description|pageimages|wbentityusage|info",
      piprop: "thumbnail",
      pithumbsize: 10000,
      pilicense: "any",
      wbeuaspect: "T",
      inprop: "url",
    },
    headers: {
      "Accept-Encoding": "gzip",
    },
  })
  .then(async (res) => {
    const data = res.data.query.pages;

    /*
     * Check if the random article has a description, thumbnail, and a WikiData
     * entry.
     */
    for (let i = 0; i < Object.keys(data).length; i++) {
      const article = data[Object.keys(data)[i]];

      const desc = article.description;
      const thumbnail = article.thumbnail ? article.thumbnail.source : null;
      const wikibaseItem = article.wbentityusage
        ? Object.keys(article.wbentityusage)[0]
        : null;

      if (!desc || !thumbnail || !wikibaseItem) {
        continue;
      }

      articles.push({
        title: article.title,
        desc,
        thumbnail,
        url: article.fullurl,
        wikibaseItem,
      });

      articles = await getArticleDates(articles);

      if (articles.length !== 0) {
        parentPort.postMessage(articles[0]);
      }
    }
  });
