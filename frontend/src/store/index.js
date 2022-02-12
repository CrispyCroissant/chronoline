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
export const actions = {};
export const getters = {
  playerLeaderboard(state) {
    return state.players.sort((a, b) => {
      return a.cardAmount - b.cardAmount;
    });
  },
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {},
});
