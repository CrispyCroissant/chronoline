import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuetify from "vuetify";
//import VueRouter from "vue-router";
import Vuex from "vuex";
import CardCreateRoom from "@/components/StartGame/CardCreateRoom.vue";

describe("The start game page", () => {
  const localVue = createLocalVue();
  let vuetify, store;
  localVue.use(Vuex);

  beforeEach(() => {
    vuetify = new Vuetify();
    //router = new VueRouter();
    store = new Vuex.Store({
      state: {},
      mutations: {},
    });
  });

  it("exists", () => {
    const wrapper = shallowMount(CardCreateRoom, {
      localVue,
      vuetify,
      store,
    });
    expect(wrapper.exists()).toBe(true);
  });
});
