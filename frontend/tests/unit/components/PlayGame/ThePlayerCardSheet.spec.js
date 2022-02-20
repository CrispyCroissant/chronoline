import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuetify from "vuetify";
import Vuex from "vuex";
import ThePlayerCardSheet from "@/components/PlayGame/ThePlayerCardSheet.vue";

describe("The player card sheet", () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  let vuetify, store, wrapper;

  beforeEach(() => {
    vuetify = new Vuetify();
    store = new Vuex.Store({
      state: {},
      getters: {
        playersCards() {
          return jest.fn();
        },
      },
    });

    wrapper = shallowMount(ThePlayerCardSheet, {
      localVue,
      vuetify,
      store,
    });
  });

  it("exists", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("minimizes the sheet on button blick", async () => {
    await wrapper.findComponent({ ref: "sizeBtn" }).trigger("click");
    const sheetContent = wrapper.findComponent({ ref: "sheetContent" });

    expect(sheetContent.isVisible()).toBe(false);
  });

  it("maximizes the sheet on button blick if minimized", async () => {
    const wrapper = shallowMount(ThePlayerCardSheet, {
      localVue,
      vuetify,
      data() {
        return {
          minimized: true,
        };
      },
      store,
    });

    await wrapper.findComponent({ ref: "sizeBtn" }).trigger("click");
    const sheetContent = wrapper.findComponent({ ref: "sheetContent" });

    expect(sheetContent.isVisible()).toBe(true);
  });
});
