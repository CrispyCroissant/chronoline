import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuetify from "vuetify";
import ThePlayersMenu from "@/components/PlayGame/ThePlayersMenu.vue";

describe("The player menu bar", () => {
  const localVue = createLocalVue();
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it("exists", () => {
    const wrapper = shallowMount(ThePlayersMenu, {
      localVue,
      vuetify,
    });
    expect(wrapper.exists()).toBe(true);
  });
});
