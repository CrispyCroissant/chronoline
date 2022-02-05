const axios = require("axios");
const { Worker } = require("worker_threads");

const propCodes = [
  { code: "P569", desc: "born" },
  { code: "P570", desc: "died" },
  { code: "P571", desc: "established" },
  { code: "P575", desc: "discovered/invented" },
  { code: "P580", desc: "started" },
  { code: "P582", desc: "ended" },
  { code: "P585", desc: "took place" },
  { code: "P746", desc: "disappeared" },
  { code: "P1249", desc: "first mentioned" },
  { code: "P1319", desc: "earliest known date" },
  { code: "P2669", desc: "discontinued" },
  { code: "P8556", desc: "extinct" },
];

async function getCards(amount) {
  return new Promise((resolve) => {
    let articles = [];
    let workers = [];

    for (let i = 0; i < amount; i++) {
      const worker = new Worker("./src/utils/worker.js");
      workers.push(worker);

      worker.on("message", (article) => {
        articles.push(article);

        if (articles.length === amount) {
          for (let i = 0; i < workers.length; i++) {
            const worker = workers[i];
            worker.terminate();
          }
          resolve(articles);
        }
      });
    }
  });
}

async function getArticleDates(articles) {
  if (!articles) throw new Error("An array of articles was not given!");

  const wikidataURL = "https://www.wikidata.org/w/api.php";
  let ids = null;

  for (let i = 0; i < articles.length; i++) {
    const wikibaseItem = articles[i].wikibaseItem;
    if (i === 0) ids = wikibaseItem;
    ids += `|${wikibaseItem}`;
  }

  try {
    let res = await axios.get(wikidataURL, {
      params: {
        action: "wbgetentities",
        ids,
        format: "json",
        languages: "en",
        props: "claims",
      },
    });

    let data = res.data;

    // * Checks if the Wiki article has a time property.
    for (let x = 0; x < articles.length; x++) {
      const article = articles[x];
      const entity = data.entities[Object.keys(data.entities)[x]];
      let dateFound = false;

      for (let z = 0; z < Object.keys(entity.claims).length; z++) {
        const claim = entity.claims[Object.keys(entity.claims)[z]][0];
        const property = claim.mainsnak.property;
        dateFound = false;

        for (let i = 0; i < propCodes.length; i++) {
          const propCode = propCodes[i].code;

          if (propCode !== property) {
            continue;
          }

          dateFound = true;
          article.date = claim.mainsnak.datavalue.value.time;
          article.timeType = propCodes[i].desc;

          // Nested loop breaks
          z = Object.keys(entity.claims).length;
          break;
        }
      }

      // Remove article if there's no appropriate date.
      if (!dateFound) {
        articles.splice(x, 1);
      }
    }

    return articles;
  } catch (error) {
    throw error;
  }
}

module.exports = { getCards, getArticleDates };
