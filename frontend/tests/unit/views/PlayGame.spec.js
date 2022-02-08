import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuetify from "vuetify";
import PlayGame from "@/views/PlayGame.vue";

describe("The start game page", () => {
  const localVue = createLocalVue();
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it("exists", () => {
    const wrapper = shallowMount(PlayGame, {
      localVue,
      vuetify,
    });
    expect(wrapper.exists()).toBe(true);
  });
});
