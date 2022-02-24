import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuetify from "vuetify";
import VueRouter from "vue-router";
import Vuex from "vuex";
import TheDialog from "@/components/PlayGame/dialog/TheDialog.vue";

describe("The dialog", () => {
  const localVue = createLocalVue();
  localVue.use(VueRouter);
  localVue.use(Vuex);
  let vuetify, router, store;
  let wrapper;

  beforeEach(() => {
    vuetify = new Vuetify();
    router = new VueRouter();
    store = new Vuex.Store({
      state: {},
      mutations: {},
    });

    wrapper = shallowMount(TheDialog, {
      localVue,
      vuetify,
      router,
      store,
    });
  });

  it("exists", () => {
    expect(wrapper.exists()).toBe(true);
  });
});
