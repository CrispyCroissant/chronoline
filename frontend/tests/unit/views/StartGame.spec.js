import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuetify from "vuetify";
import VueRouter from "vue-router";
import StartGame from "@/views/StartGame.vue";

describe("The start game page", () => {
  const localVue = createLocalVue();
  let vuetify, router;

  beforeEach(() => {
    vuetify = new Vuetify();
    router = new VueRouter();
  });

  it("exists", () => {
    const wrapper = shallowMount(StartGame, {
      localVue,
      vuetify,
    });
    expect(wrapper.exists()).toBe(true);
  });
});
