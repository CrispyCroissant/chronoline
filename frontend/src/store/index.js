import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const state = {
  nickname: "",
};
export const mutations = {
  setNickname(state, nickname) {
    state.nickname = nickname;
  },
};
export const actions = {};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {},
});
