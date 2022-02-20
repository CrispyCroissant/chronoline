import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuetify from "vuetify";
import PlayingCard from "@/components/PlayGame/PlayingCard.vue";

describe("The playing card", () => {
  const localVue = createLocalVue();
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it("exists", () => {
    const wrapper = shallowMount(PlayingCard, {
      localVue,
      vuetify,
    });
    expect(wrapper.exists()).toBe(true);
  });
});
