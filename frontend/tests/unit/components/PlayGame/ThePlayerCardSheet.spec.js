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

  it("minimizes the sheet on button blick", async () => {
    const wrapper = shallowMount(ThePlayerCardSheet, {
      localVue,
      vuetify,
    });

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
    });

    await wrapper.findComponent({ ref: "sizeBtn" }).trigger("click");
    const sheetContent = wrapper.findComponent({ ref: "sheetContent" });

    expect(sheetContent.isVisible()).toBe(true);
  });
});
