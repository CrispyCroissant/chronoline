module.exports = class {
  constructor(nickname) {
    this.nickname = nickname;
    this.cards = [];
    this.cardAmount = 0;
  }

  addCard(card) {
    this.cards.push(card);
    this.cardAmount++;
  }

  removeCard(card) {
    const index = this.cards.findIndex((element) => {
      return element.title === card.title;
    });

    this.cards.splice(index, 1);
    this.cardAmount--;
  }

  reset() {
    this.cards = [];
    this.cardAmount = 0;
  }
};
