import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuetify from "vuetify";
import Vuex from "Vuex";
import ThePlayersMenu from "@/components/PlayGame/ThePlayersMenu.vue";

describe("The player menu bar", () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  let vuetify, store;

  beforeEach(() => {
    vuetify = new Vuetify();
    store = new Vuex.Store({
      state: {
        players: [],
      },
    });
  });

  it("exists", () => {
    const wrapper = shallowMount(ThePlayersMenu, {
      localVue,
      vuetify,
      store,
    });
    expect(wrapper.exists()).toBe(true);
  });
});
