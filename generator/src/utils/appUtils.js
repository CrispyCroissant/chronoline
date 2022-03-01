const { Worker } = require("worker_threads");
const { cpus } = require("os");

async function getCards(amount) {
  return new Promise((resolve) => {
    const maxWorkers = cpus().length;
    let cards = [];
    let workers = [];
    let cardAmount = 0;

    for (let i = 0; i < maxWorkers; i++) {
      const worker = new Worker("./src/worker.js");
      workers.push(worker);

      worker.on("message", async (articles) => {
        articles.forEach((article) => {
          cards.push(article);
          cardAmount++;
        });

        console.log(`${cardAmount} cards`);

        if (cardAmount >= amount) {
          workers.forEach((worker) => {
            worker.terminate();
          });
          resolve(cards);
        }
      });
    }
  });
}

function msToMinAndSec(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return seconds == 60
    ? minutes + 1 + ":00"
    : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

function verify(cards, expectedAmount) {
  let hasErrors = false;

  // Check if there are cards without dates.
  let noDates = 0;
  for (const card of cards) {
    if (typeof card.date === "undefined") {
      noDates++;
    }
  }
  if (noDates) {
    hasErrors = true;
    console.log(`Cards without dates: ${broken}`);
  }

  // Check if there's at least N amount of cards
  if (cards.length < expectedAmount) {
    hasErrors = true;
    console.log(
      `There's only '${cards.length}' cards, expected '${expectedAmount}'.`
    );
  }

  // Check if all cards are unique
  const uniqueSet = new Set(cards);
  if (uniqueSet.size !== cards.length) {
    hasErrors = true;
    console.log(`'${cards.length - uniqueSet.size}' duplicates were found.`);
  }

  if (hasErrors) {
    throw new Error("Errors were found in the card array");
  }

  return true;
}

module.exports = { getCards, msToMinAndSec, verify };
