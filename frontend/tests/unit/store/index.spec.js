import { state, mutations } from "../../../src/store";

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
  it("can set the nickname state", () => {
    mutations.setNickname(state, "test");

    expect(state.nickname).toBe("test");
  });

  it("can set the card deck", () => {
    const payload = [{ title: "test", desc: "test" }];

    mutations.setCardDeck(state, payload);

    expect(state.cardDeck).toEqual(payload);
  });

  it("can set the cards on the table", () => {
    const payload = [{ title: "test", desc: "test" }];

    mutations.setCardsOnTable(state, payload);

    expect(state.cardsOnTable).toEqual(payload);
  });

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
