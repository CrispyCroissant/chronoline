import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuetify from "vuetify";
import Vuex from "vuex";
import TheTable from "@/components/PlayGame/TheTable.vue";

describe("The playing table", () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  let vuetify, store;

  beforeEach(() => {
    vuetify = new Vuetify();
    store = new Vuex.Store({
      store: {},
    });
  });

  it("exists", () => {
    const wrapper = shallowMount(TheTable, {
      localVue,
      vuetify,
      store,
    });
    expect(wrapper.exists()).toBe(true);
  });
});
