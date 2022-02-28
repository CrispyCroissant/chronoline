const { performance } = require("perf_hooks");
const fs = require("fs");
const fsPromises = fs.promises;
const { getCards, msToMinAndSec } = require("./utils/appUtils");

async function main() {
  const args = process.argv.slice(2);
  let cardAmount = 1000;
  let saveTo = __dirname;

  if (args[0]) {
    if (isNaN(args[0])) throw new Error("First argument must be a number!");
    cardAmount = args[0];
  }

  if (args[1]) {
    if (!fs.lstatSync(args[1]).isDirectory()) {
      throw new Error("2nd argument must be the path to a directory");
    }
    saveTo = args[1];
  }

  console.log(`Generating ${cardAmount} cards...`);
  const startTime = performance.now();
  const cards = await getCards(cardAmount);
  const endTime = performance.now();
  console.log(
    `Card generation finished (${msToMinAndSec(endTime - startTime)})`
  );

  try {
    console.log("Writing to file...");
    await fsPromises.writeFile(`${saveTo}/cards.json`, JSON.stringify(cards));
    console.log("File saved!\nEverything went OK!");
  } catch (error) {
    console.error(error);
  }
}

main();
