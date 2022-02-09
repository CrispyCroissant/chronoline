import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuetify from "vuetify";
import MenuPlayers from "@/components/PlayGame/MenuPlayers.vue";

describe("The player menu bar", () => {
  const localVue = createLocalVue();
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it("exists", () => {
    const wrapper = shallowMount(MenuPlayers, {
      localVue,
      vuetify,
    });
    expect(wrapper.exists()).toBe(true);
  });
});
