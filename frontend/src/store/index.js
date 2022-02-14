import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

/*
 * Structure of the state.
 *
 * cardDeck: [Card]
 * cardsOnTable: [Card]
 * players: [
 *  {
 *    nickname: "",
 *    cards: [Card],
 *    cardAmount: cards.length
 *  }
 * ]
 */
export const state = {
  nickname: "",
  cardDeck: [],
  cardsOnTable: [],
  players: [],
  currentPlayerTurn: "",
};
export const mutations = {
  setNickname(state, nickname) {
    state.nickname = nickname;
  },
  setCardDeck(state, deck) {
    state.cardDeck = deck;
  },
  setCardsOnTable(state, cards) {
    state.cardsOnTable = cards;
  },
  setPlayers(state, players) {
    state.players = players;
  },
  setCurrentTurn(state, player) {
    state.currentPlayerTurn = player;
  },
};
export const actions = {
  initStore({ commit }, data) {
    commit("setCardDeck", data.deck);
    commit("setCardsOnTable", data.table);
    commit("setPlayers", data.players);
    commit("setCurrentTurn", data.currentTurn);
  },
};
export const getters = {
  playerLeaderboard(state) {
    return state.players.sort((a, b) => {
      return a.cardAmount - b.cardAmount;
    });
  },
  playersCards: (state) => (name) => {
    const player = state.players.find((player) => {
      return player.nickname === name;
    });
    return player.cards;
  },
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {},
});
