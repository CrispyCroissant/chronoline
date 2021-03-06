const { getCards } = require("../utils/cardUtils");

class Room {
  constructor(id, host) {
    this.id = id;
    this.table = [];
    this.deck = [];
    this.players = [host];
    this.currentTurn = "";
    this.status = "waiting";
  }

  reset() {
    this.table = [];
    this.deck = [];
    this.currentTurn = this.#getRandomPlayerNickname();
    this.#resetPlayers();
  }

  addPlayer(player) {
    this.players.push(player);
  }

  fillDeck(amount) {
    if (amount >= 50) {
      this.deck = getCards(50, this.table);
    } else {
      this.deck = getCards(amount, this.table);
    }
  }

  changeStatus() {
    if (this.status === "waiting") {
      this.status = "playing";
    } else {
      this.status = "waiting";
    }
  }

  handOutCards(amount) {
    this.players.forEach((player) => {
      for (let i = 0; i < amount; i++) {
        const index = Math.floor(Math.random() * this.deck.length);
        const randCard = this.deck[index];

        player.addCard(randCard);
        this.deck.splice(index, 1); // Remove from deck.
      }
    });
  }

  initTable() {
    const index = Math.floor(Math.random() * this.deck.length);
    const randCard = this.deck[index];

    this.table.push(randCard);
    try {
      this.currentTurn = this.#getRandomPlayerNickname();
    } catch (error) {
      throw new Error("Player has left the room");
    }

    // Remove card from deck
    this.deck.splice(index, 1);
  }

  insertCard(card, index) {
    this.#setCardsRecentFalse();
    card.mostRecent = true;
    this.table.splice(index, 0, card);
  }

  // Next turn in order of players.
  startNextTurn() {
    let turnIndex = this.players.findIndex((player) => {
      return player.nickname === this.currentTurn;
    });

    if (turnIndex === this.players.length - 1) {
      turnIndex = 0;
    } else {
      turnIndex++;
    }

    this.currentTurn = this.players[turnIndex].nickname;
  }

  hasWinner() {
    return this.players.find((player) => {
      return player.cards.length === 0;
    });
  }

  checkPlayedCard(card, index, player) {
    const room = this;
    const cardDate = new Date(card.date).getFullYear();
    let firstOrLastPos = false;
    let correctPlace = false;

    // Card is the first position on the table
    if (typeof room.table[index - 1] === "undefined") {
      const rightCardDate = new Date(room.table[index + 1].date).getFullYear();
      firstOrLastPos = true;

      if (rightCardDate >= cardDate) {
        correctPlace = true;
      } else {
        correctPlace = false;
      }
    }

    // Card is in the last position on the table
    if (typeof room.table[index + 1] === "undefined") {
      const leftCardDate = new Date(room.table[index - 1].date).getFullYear();
      firstOrLastPos = true;

      if (leftCardDate <= cardDate) {
        correctPlace = true;
      } else {
        correctPlace = false;
      }
    }

    // Card is between two cards
    if (!correctPlace && !firstOrLastPos) {
      const rightCardDate = new Date(room.table[index + 1].date).getFullYear();

      if (rightCardDate >= cardDate) {
        correctPlace = true;
      } else {
        correctPlace = false;
      }

      if (correctPlace) {
        const leftCardDate = new Date(room.table[index - 1].date).getFullYear();

        if (leftCardDate <= cardDate) {
          correctPlace = true;
        } else {
          correctPlace = false;
        }
      }
    }

    if (!correctPlace) {
      room.#sortTable();
      room.#drawCard(player);
    }

    card.correct = correctPlace;
    return !!correctPlace;
  }

  #sortTable() {
    this.table.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });
  }

  #drawCard(player) {
    let index = Math.floor(Math.random() * this.deck.length);
    const randCard = this.deck[index];

    player.addCard(randCard);

    this.deck.splice(index, 1);
  }

  #getRandomPlayerNickname() {
    return this.players[Math.floor(Math.random() * this.players.length)]
      .nickname;
  }

  #resetPlayers() {
    this.players.forEach((player) => {
      player.reset();
    });
  }

  #setCardsRecentFalse() {
    this.table.forEach((card) => {
      card.mostRecent = false;
    });
  }
}

module.exports = Room;
