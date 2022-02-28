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

module.exports = { getCards, msToMinAndSec };
