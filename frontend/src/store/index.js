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
};
export const actions = {};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {},
});
