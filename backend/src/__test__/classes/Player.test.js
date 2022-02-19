const Player = require("../../classes/Player");

describe("The Player class", () => {
  let player;

  beforeEach(() => {
    player = new Player("test");
  });

  describe("the constructor", () => {
    it("creates a player with a nickname and no cards", () => {
      expect(player.nickname).toBe("test");
      expect(player.cards.length).toBe(0);
      expect(player.cardAmount).toBe(0);
    });
  });

  describe("addCard()", () => {
    it("pushes the card to the player's list of cards", () => {
      player.cards = [1, 2, 3];
      player.addCard({ title: "card" });

      expect(player.cards.length).toBe(4);
      expect(player.cards[3]).toStrictEqual({ title: "card" });
    });

    it("increments the card amount", () => {
      player.addCard({ title: "card" });

      expect(player.cardAmount).toBe(1);
    });
  });

  describe("removeCard()", () => {
    it("removes the given card from the list of cards", () => {
      const card = { title: "card" };

      player.addCard(card);
      player.removeCard(card);

      expect(player.cards).toEqual([]);
    });

    it("decrements the card amount", () => {
      const card = { title: "card" };

      player.addCard(card);
      player.removeCard(card);

      expect(player.cardAmount).toBe(0);
    });
  });

  describe("reset()", () => {
    it("resets the card list and card amount field", () => {
      const card = { title: "card" };
      player.addCard(card);

      player.reset();

      expect(player.cards).toEqual([]);
      expect(player.cardAmount).toBe(0);
    });
  });
});
