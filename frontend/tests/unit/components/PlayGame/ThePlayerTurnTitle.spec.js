import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuetify from "vuetify";
import Vuex from "Vuex";
import ThePlayerTurnTitle from "@/components/PlayGame/ThePlayerTurnTitle.vue";

describe("The title", () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  let vuetify, store;

  beforeEach(() => {
    vuetify = new Vuetify();
    store = new Vuex.Store({
      state: {},
    });
  });

  it("exists", () => {
    const wrapper = shallowMount(ThePlayerTurnTitle, {
      localVue,
      vuetify,
      store,
    });
    expect(wrapper.exists()).toBe(true);
  });
});
