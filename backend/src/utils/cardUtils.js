const path = require("path");
const fs = require("fs");
const cache = require("../cache/memoryCache");

function storeCardsInCache() {
  const data = fs.readFileSync(
    path.join(__dirname, "..", "..", "data", "cards.json")
  );

  cache.set("cards", JSON.parse(data));
}

function getCards(amount) {
  const allCards = cache.get("cards");
  let requestedCards = [];

  for (let i = 0; i < amount; i++) {
    const card = allCards[Math.floor(Math.random() * allCards.length)];

    if (requestedCards.includes(card)) {
      i--;
      continue;
    }

    requestedCards.push(card);
  }
  return requestedCards;
}

module.exports = { storeCardsInCache, getCards };
