import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuetify from "vuetify";
import PlayerCardSheet from "@/components/PlayGame/PlayerCardSheet.vue";

describe("The player card sheet", () => {
  const localVue = createLocalVue();
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it("exists", () => {
    const wrapper = shallowMount(PlayerCardSheet, {
      localVue,
      vuetify,
    });
    expect(wrapper.exists()).toBe(true);
  });
});
