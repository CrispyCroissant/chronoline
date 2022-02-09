import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuetify from "vuetify";
import ThePlayerCardSheet from "@/components/PlayGame/ThePlayerCardSheet.vue";

describe("The player card sheet", () => {
  const localVue = createLocalVue();
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it("exists", () => {
    const wrapper = shallowMount(ThePlayerCardSheet, {
      localVue,
      vuetify,
    });
    expect(wrapper.exists()).toBe(true);
  });
});
