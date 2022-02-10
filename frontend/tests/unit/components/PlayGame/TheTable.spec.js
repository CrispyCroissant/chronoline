import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuetify from "vuetify";
import TheTable from "@/components/PlayGame/TheTable.vue";

describe("The playing table", () => {
  const localVue = createLocalVue();
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it("exists", () => {
    const wrapper = shallowMount(TheTable, {
      localVue,
      vuetify,
    });
    expect(wrapper.exists()).toBe(true);
  });
});
