import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuetify from "vuetify";
import Vuex from "vuex";
import VueRouter from "vue-router";
import DialogCardLoading from "@/components/PlayGame/dialog/DialogCardLoading.vue";

describe("The loading card", () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  localVue.use(VueRouter);
  let vuetify, store, router;
  let wrapper;

  beforeEach(() => {
    vuetify = new Vuetify();
    store = new Vuex.Store({
      state: {},
      mutations: {},
    });
    router = new VueRouter();

    wrapper = shallowMount(DialogCardLoading, {
      localVue,
      vuetify,
      store,
      router,
      propsData: {
        show: true,
      },
    });
  });

  it("shows itself when loading", () => {
    const loadDialog = wrapper.findComponent({ ref: "card" });

    expect(loadDialog.exists()).toBe(true);
  });

  it("closes the loading dialog when loading is finished", async () => {
    await wrapper.setProps({ show: false });

    const loadDialog = wrapper.findComponent({ ref: "card" });

    expect(loadDialog.exists()).toBe(false);
  });

  it("does NOT show loading animation if there's 2 players or more", async () => {
    await wrapper.setData({ playerAmount: 2 });

    const loadingAnim = wrapper.findComponent({ ref: "loadingAnim" });

    expect(loadingAnim.exists()).toBe(false);
  });

  it("shows the play button ONLY when there's 2 players or more", async () => {
    await wrapper.setData({ playerAmount: 1 });

    let btn = wrapper.findComponent({ ref: "startBtn" });
    expect(btn.exists()).toBe(false);

    await wrapper.setData({ playerAmount: 2 });
    btn = wrapper.findComponent({ ref: "startBtn" });

    expect(btn.exists()).toBe(true);
  });

  it("emits a startGame event to the server", async () => {
    await wrapper.setData({ playerAmount: 4 });

    const spy = jest.spyOn(wrapper.vm, "startGame").mockResolvedValueOnce();

    await wrapper.findComponent({ ref: "startBtn" }).trigger("click");

    expect(spy).toBeCalledTimes(1);
  });

  it("shows loading animation if game started", async () => {
    await wrapper.setData({ gameStarted: true });

    const loading = wrapper.findComponent({ ref: "loadingAnim" });

    expect(loading.exists()).toBe(true);
  });
});
