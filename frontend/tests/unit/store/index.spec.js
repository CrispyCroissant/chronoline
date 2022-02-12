import { state, mutations, getters } from "../../../src/store";

describe("The store", () => {
  it("has a nickname state", () => {
    expect(state.nickname).toBeDefined();
  });

  it("has a card deck state", () => {
    expect(state.cardDeck).toBeDefined();
  });

  it("has a cards on table/played cards state", () => {
    expect(state.cardsOnTable).toBeDefined();
  });

  it("has a players state", () => {
    expect(state.players).toBeDefined();
  });
});

describe("The mutations", () => {
  describe("setNickname", () => {
    it("can set the nickname state", () => {
      mutations.setNickname(state, "test");

      expect(state.nickname).toBe("test");
    });
  });

  describe("setCardDeck", () => {
    it("can set the card deck", () => {
      const payload = [{ title: "test", desc: "test" }];

      mutations.setCardDeck(state, payload);

      expect(state.cardDeck).toEqual(payload);
    });
  });

  describe("setCardsOnTable", () => {
    it("can set the cards on the table", () => {
      const payload = [{ title: "test", desc: "test" }];

      mutations.setCardsOnTable(state, payload);

      expect(state.cardsOnTable).toEqual(payload);
    });
  });

  describe("setPlayers", () => {
    it("can set the players array", () => {
      const payload = [
        {
          nickname: "User",
          cards: [{ title: "test", desc: "test" }],
          cardAmount() {
            return this.cards.length;
          },
        },
      ];

      mutations.setPlayers(state, payload);

      expect(state.players).toEqual(payload);
      expect(state.players[0].cardAmount()).toEqual(1);
    });
  });
});

describe("The getters", () => {
  describe("playerLeaderboard", () => {
    it("can sort the players by least amount of cards", () => {
      const mockedState = {
        players: [{ cardAmount: 3 }, { cardAmount: 6 }, { cardAmount: 2 }],
      };

      const result = getters.playerLeaderboard(mockedState);

      expect(result).toEqual([
        { cardAmount: 2 },
        { cardAmount: 3 },
        { cardAmount: 6 },
      ]);
    });
  });
});
