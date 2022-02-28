const path = require("path");
const fs = require("fs");
const fsPromises = fs.promises;
const cache = require("../cache/memoryCache");

async function storeCardsInCache() {
  const data = await fsPromises.readFile(
    path.join(__dirname, "..", "..", "data", "cards.json")
  );

  cache.set("cards", JSON.parse(data));
}

module.exports = { storeCardsInCache };
