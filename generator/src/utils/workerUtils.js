const axios = require("axios");
const { parentPort } = require("worker_threads");

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

async function getArticleDates(articles) {
  if (!articles) throw new Error("An array of articles was not given!");

  const wikidataURL = "https://www.wikidata.org/w/api.php";
  let ids = null;

  for (let i = 0; i < articles.length; i++) {
    const wikibaseItem = articles[i].wikibaseItem;
    if (i === 0) {
      ids = wikibaseItem;
      continue;
    }
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
      headers: {
        "Accept-Encoding": "gzip",
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

          if (!claim.mainsnak.datavalue) {
            continue;
          }

          try {
            article.date = parseDate(claim.mainsnak.datavalue.value.time);
          } catch (error) {
            continue;
          }

          article.timeType = propCodes[i].desc;
          dateFound = true;

          // Nested loop breaks
          z = Object.keys(entity.claims).length;
          break;
        }
      }

      // Remove article if there's no appropriate date.
      if (!dateFound) {
        delete articles[x];
      }
    }

    articles = articles.filter((article) => {
      return article != undefined;
    });

    return articles;
  } catch (error) {
    throw error;
  }
}

function parseDate(date) {
  const dateString = convToECMA262(date);

  const dateInstance = new Date(dateString);

  const invalidDate = dateInstance instanceof Date && isNaN(dateInstance);

  if (invalidDate) throw new Error("Date is invalid!");

  return dateInstance;
}

// Converts the Wikidata date format to the one given here
// https://262.ecma-international.org/#sec-date-time-string-format
function convToECMA262(date) {
  const sign = date.charAt(0);
  const yearIndex = date.indexOf("-", 1);

  let yearString = date.substring(1, yearIndex);
  let restOfString = date.substring(yearIndex);
  let dateString = "";

  if (yearString.length != 6) {
    const digitsToAdd = 6 - yearString.length;

    for (let i = 0; i < digitsToAdd; i++) yearString = "0" + yearString;

    restOfString = restOfString.replaceAll("-00", "-01");

    dateString = sign + yearString + restOfString;
  } else {
    dateString = date;
  }

  return dateString;
}

function removeYear(string) {
  const parantStart = string.indexOf("(");
  const parantEnd = string.indexOf(")");
  const hasParenthesis = parantStart != -1 && parantEnd != -1;

  if (hasParenthesis) {
    const hasNumber = /\d/.test(string);

    if (hasNumber) {
      return string.replace(string.slice(parantStart, parantEnd + 1), "");
    }
  }

  return string;
}

async function checkArticlesAndSend(articles) {
  articles = await getArticleDates(articles);

  if (articles.length !== 0) parentPort.postMessage(articles);
}

module.exports = {
  getArticleDates,
  parseDate,
  removeYear,
  checkArticlesAndSend,
};
