import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuetify from "vuetify";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";

describe("The landing page", () => {
  const localVue = createLocalVue();
  let vuetify, router;

  beforeEach(() => {
    vuetify = new Vuetify();
    router = new VueRouter();
  });

  it("exists", () => {
    const wrapper = shallowMount(Home, {
      localVue,
      vuetify,
    });
    expect(wrapper.exists()).toBe(true);
  });

  it("redirects to StartGame on button click", async () => {
    const wrapper = shallowMount(Home, {
      localVue,
      vuetify,
      router,
    });

    const spy = jest.spyOn(wrapper.vm, "goToStart").mockReturnValue();

    await wrapper.findComponent({ ref: "startBtn" }).trigger("click");

    expect(spy).toBeCalledTimes(1);
  });
});
