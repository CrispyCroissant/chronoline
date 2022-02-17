import { state, mutations, getters, actions } from "../../../src/store";

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

  it("has a current player's turn state", () => {
    expect(state.currentPlayerTurn).toBeDefined();
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

  describe("setCurrentTurn", () => {
    it("can set the current turn to be a specific player's", () => {
      mutations.setCurrentTurn(state, "TestPlayer");

      expect(state.currentPlayerTurn).toEqual("TestPlayer");
    });
  });

  describe("setCardOnTable", () => {
    it("inserts the card at the correct index", () => {
      state.cardsOnTable = ["One", "Two", "Three"];

      mutations.setCardOnTable(state, { card: "test", index: 2 });
      expect(state.cardsOnTable[2]).toBe("test");
    });

    it("does not remove any cards", () => {
      state.cardsOnTable = ["One", "Two", "Three"];

      mutations.setCardOnTable(state, { card: "test", index: 2 });
      expect(state.cardsOnTable.length).toBe(4);
    });
  });
});

describe("The actions", () => {
  describe("initStore", () => {
    it("initializes the store with the given data", () => {
      const table = ["Card1", "Card2"];
      const deck = ["Card3", "Card4"];
      const players = ["Player1", "Player2"];
      const currentTurn = "Player1";

      const data = { table, deck, players, currentTurn };

      const commit = (mutationName, payload) => {
        mutations[mutationName](state, payload);
      };
      actions.initStore({ commit }, data);

      expect(state.cardsOnTable).toEqual(table);
      expect(state.cardDeck).toEqual(deck);
      expect(state.players).toEqual(players);
      expect(state.currentPlayerTurn).toBe(currentTurn);
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

  describe("isYourTurn", () => {
    it("returns true if current turn is this player's", () => {
      const mockedState = {
        nickname: "Test1",
        currentPlayerTurn: "Test1",
      };

      const result = getters.isYourTurn(mockedState);

      expect(result).toBe(true);
    });

    it("returns false if current turn is NOT this player's", () => {
      const mockedState = {
        nickname: "Test2",
        currentPlayerTurn: "Test1",
      };

      const result = getters.isYourTurn(mockedState);

      expect(result).toBe(false);
    });
  });

  // TODO: Fix later
  /* describe("playersCards", () => {
    it("can return a certain player's cards", () => {
      const mockedState = {
        players: [
          { nickname: "RealPlayer", cards: [] },
          { nickname: "TestPlayer", cards: ["TestCard"] },
        ],
      };

      const result = getters.playersCards(mockedState, "TestPlayer");

      expect(result).toEqual(["TestCard"]);
    });
  }); */
});
