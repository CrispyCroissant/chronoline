const axios = require("axios");
const { checkArticlesAndSend, removeYear } = require("./utils/workerUtils");

doWork();

async function doWork() {
  while (true) {
    await generateCard();
  }
}

async function generateCard() {
  const wikipediaURL = "https://en.wikipedia.org/w/api.php";
  const articlesPerRequest = 30;
  let articles = [];
  let promisedResponses = [];

  for (let i = 0; i < 10; i++) {
    promisedResponses.push(
      axios.get(wikipediaURL, {
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
      })
    );
  }

  const responses = await Promise.all(promisedResponses);

  for (let i = 0; i < responses.length; i++) {
    const res = responses[i];

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
        if (isLastArticle) await checkArticlesAndSend(articles);
        continue;
      }

      if (wikiLinks.length < 3) {
        if (isLastArticle) await checkArticlesAndSend(articles);
        continue;
      }
      
      // This wikibaseItem links to a Wikidata template. It's garbage.
      if (wikibaseItem === "Q22321052") {
        if (isLastArticle) await checkArticlesAndSend(articles);
        continue;
      }

      articles.push({
        title: removeYear(article.title),
        desc: removeYear(desc),
        thumbnail,
        url: article.fullurl,
        wikibaseItem,
        correct: null,
      });

      if (isLastArticle) await checkArticlesAndSend(articles);
    }
    articles = [];
  }
}
