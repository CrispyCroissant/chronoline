const axios = require("axios");
const { parentPort } = require("worker_threads");
const { getArticleDates } = require("./article");

generateCard();

async function generateCard() {
  const wikipediaURL = "https://en.wikipedia.org/w/api.php";
  const articlesPerRequest = 30;
  let articles = [];

  const res = await axios.get(wikipediaURL, {
    params: {
      format: "json",
      action: "query",
      generator: "random",
      grnlimit: articlesPerRequest,
      grnnamespace: 0,
      grnfilterredir: "nonredirects",
      prop: "description|pageimages|wbentityusage|info|iwlinks",
      piprop: "thumbnail",
      pithumbsize: 500,
      pilicense: "any",
      wbeuaspect: "T",
      inprop: "url",
      iwlimit: "max",
    },
    headers: {
      "Accept-Encoding": "gzip",
    },
  });

  const data = res.data.query.pages;

  /*
   * Check if the random article has a description, thumbnail, and a WikiData
   * entry.
   */
  for (let i = 0; i < Object.keys(data).length; i++) {
    const isLastArticle = i === articlesPerRequest - 1;
    const article = data[Object.keys(data)[i]];

    const desc = article.description;
    const thumbnail = article.thumbnail ? article.thumbnail.source : null;
    const wikibaseItem = article.wbentityusage
      ? Object.keys(article.wbentityusage)[0]
      : null;
    const wikiLinks = article.iwlinks;

    if (!desc || !thumbnail || !wikibaseItem || !wikiLinks) {
      if (isLastArticle) await generateCard();
      continue;
    }

    if (wikiLinks.length < 3) {
      if (isLastArticle) {
        await generateCard();
      }
      continue;
    }

    articles.push({
      title: article.title,
      desc,
      thumbnail,
      url: article.fullurl,
      wikibaseItem,
      correct: null,
    });

    articles = await getArticleDates(articles);

    if (articles.length !== 0) {
      parentPort.postMessage(articles[0]);
      articles = [];
    }

    if (isLastArticle) await generateCard();
  }
}
