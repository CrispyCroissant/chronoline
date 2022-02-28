const Room = require("../../classes/Room");
const Player = require("../../classes/Player");
const article = require("../../utils/cardUtils");

jest.mock("../../utils/cardUtils");

describe("The Room class", () => {
  const roomID = "123";
  let room, host;

  beforeEach(() => {
    host = new Player("testName");
    room = new Room(roomID, host);
  });

  describe("the constructor", () => {
    it("creates a room with a room ID and 1 player", () => {
      expect(room.id).toBe(roomID);
      expect(room.players).toEqual([host]);
    });

    test("the table, card deck, and the current player turn should be empty", () => {
      expect(room.table).toEqual([]);
      expect(room.deck).toEqual([]);
      expect(room.currentTurn).toBe("");
    });
  });

  describe("reset()", () => {
    beforeEach(() => {
      room.table = [1, 2, 3];
      room.deck = [4, 5, 6];
      room.players.push(new Player("testName2"));
    });

    it("should reset the table and deck", () => {
      room.reset();

      expect(room.table).toEqual([]);
      expect(room.deck).toEqual([]);
    });

    it("should set the current player turn to a random player", () => {
      room.reset();

      expect(["testName", "testName2"]).toContain(room.currentTurn);
    });

    it("calls the Player class reset method on each player", () => {
      const spy = jest.spyOn(Player.prototype, "reset");

      room.reset();

      expect(spy).toBeCalledTimes(room.players.length);
    });
  });

  describe("addPlayer()", () => {
    it("pushes the given player to the player list", () => {
      const newPlayer = new Player("new");

      room.addPlayer(newPlayer);

      expect(room.players).toContain(newPlayer);
    });
  });

  describe("fillDeck()", () => {
    let spy;

    beforeEach(() => {
      room.deck = [];
      spy = jest.spyOn(article, "getCards").mockResolvedValueOnce();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("adds X amount of cards to the deck if below 50", () => {
      room.fillDeck(30);

      expect(spy).toBeCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(30);
    });

    it("adds 50 cards to the deck if given amount is 50", () => {
      room.fillDeck(50);

      expect(spy).toBeCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(50);
    });

    it("adds 50 cards to the deck if given amount is HIGHER than 50", () => {
      room.fillDeck(51);

      expect(spy).toBeCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(50);
    });
  });

  describe("handOutCards()", () => {
    beforeEach(() => {
      room.deck = [{ title: 1 }, { title: 2 }, { title: 3 }, { title: 4 }];
      room.players.push(new Player("testName2"));
    });

    it("takes x amount of unique cards from the deck and gives them to each player", () => {
      room.handOutCards(2);

      expect(room.players[0].cards.length).toBe(2);
      expect(room.players[1].cards.length).toBe(2);
    });

    it("will reduce the deck card amount depending on (N x players)", () => {
      const expectedDeckAmount = room.deck.length - 2 * 2;
      room.handOutCards(2);

      expect(room.deck.length).toBe(expectedDeckAmount);
    });
  });

  describe("initTable()", () => {
    const listCards = [{ title: 1 }, { title: 2 }, { title: 3 }, { title: 4 }];

    beforeEach(() => {
      room.deck = [...listCards];
      room.players.push(new Player("testName2"));
    });

    it("pushes a random card from the deck to the table", () => {
      room.initTable();

      expect(listCards).toContain(room.table[0]);
    });

    it("removes the pushed card from the deck", () => {
      room.initTable();

      expect(room.deck).not.toContain(room.table[0]);
    });

    it("set the player current turn to a random player", () => {
      room.initTable();

      expect.assertions(1);

      room.players.forEach((player) => {
        if (room.currentTurn == player.nickname) {
          expect(room.currentTurn).toBe(player.nickname);
        }
      });
    });
  });

  describe("insertCard()", () => {
    beforeEach(() => {
      room.table = [{ title: 1 }, { title: 3 }];
    });

    it("inserts the card in the table at specified index", () => {
      const card = { title: 2 };

      room.insertCard(card, 1);

      expect(room.table[1]).toBe(card);
    });
  });

  describe("startNextTurn()", () => {
    beforeEach(() => {
      room.players.push(new Player("test2"));
      room.currentTurn = room.players[0].nickname;
    });

    it("changes the current turn to the next player (left-to-right)", () => {
      room.startNextTurn();

      expect(room.currentTurn).toBe(room.players[1].nickname);
    });

    it("goes back to the first player (left-most) if its continuing from last player's turn", () => {
      room.currentTurn = room.players[1].nickname;

      room.startNextTurn();

      expect(room.currentTurn).toBe(room.players[0].nickname);
    });
  });

  describe("hasWinner()", () => {
    const player = new Player("theWinner");

    beforeEach(() => {
      room.players[0].cards = [1, 2, 3];
      room.players.push(player);
    });

    it("returns the winning player (the player that has no cards left)", () => {
      expect(room.hasWinner()).toBe(player);
    });

    it("returns nothing if there's no winning player", () => {
      player.cards = [1, 2];

      expect(room.hasWinner()).toBe(undefined);
    });
  });

  describe("checkPlayedCard", () => {
    beforeEach(() => {
      room.table = [
        { date: new Date("Jan 1 2000") },
        { date: new Date("Jan 1 2002") },
        { date: new Date("Jan 1 2004") },
      ];
      room.deck = [1, 2, 3];
    });

    it("returns true if the played card is in the correct place (before 1st)", () => {
      const card = { date: new Date("Jan 1 1999") };

      const result = room.checkPlayedCard(card, 0, host);

      expect(result).toBe(true);
    });

    it("returns true if the played card is in the correct place (after last)", () => {
      const card = { date: new Date("Jan 1 2005") };

      const result = room.checkPlayedCard(card, 3, host);

      expect(result).toBe(true);
    });

    it("returns true if the played card is in the correct place (between two cards)", () => {
      const card = { date: new Date("Jan 1 2001") };

      const result = room.checkPlayedCard(card, 1, host);

      expect(result).toBe(true);
    });

    it("returns false if the played card is in the incorrect place", () => {
      const card = { date: new Date("Jan 1 2006") };

      const result = room.checkPlayedCard(card, 1, host);

      expect(result).toBe(false);
    });

    it("sets the card correctness to either false or true", () => {
      const card = { date: new Date("Jan 1 2006") };

      room.checkPlayedCard(card, 1, host);

      expect(card.correct).toBe(false);
    });

    it("sorts the table in the correct order if the guess was incorrect", () => {
      const card = { date: new Date("Jan 1 2006") };

      room.insertCard(card);
      room.checkPlayedCard(card, 1, host);

      expect(room.table[3]).toBe(card);
    });

    it("gives the player a card from the deck if the guess was incorrect", () => {
      const card = { date: new Date("Jan 1 2006") };

      room.insertCard(card);
      room.checkPlayedCard(card, 1, host);

      expect(room.deck).not.toContain(host.cards[0]);
    });
  });

  describe("insertCard()", () => {
    beforeEach(() => {
      room.table = [
        { date: new Date("Jan 1 2000") },
        { date: new Date("Jan 1 2002") },
        { date: new Date("Jan 1 2004") },
      ];
    });

    it("sets all cards' mostRecent prop to false except for one", () => {
      const mockCard = { date: new Date("Jan 1 2006") };

      room.insertCard(mockCard);

      room.table.forEach((card) => {
        if (card === mockCard) {
          expect(card.mostRecent).toBe(true);
        } else {
          expect(card.mostRecent).toBe(false);
        }
      });
    });
  });
});
