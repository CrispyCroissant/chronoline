import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuetify from "vuetify";
import VueRouter from "vue-router";
import Vuex from "vuex";
import TheDialog from "@/components/PlayGame/TheDialog.vue";

describe("The dialogs", () => {
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

  describe("The loading dialog", () => {
    it("shows itself when loading", () => {
      const wrapper = shallowMount(TheDialog, {
        localVue,
        vuetify,
        router,
        data() {
          return {
            showLoadingDialog: true,
            isHost: true,
          };
        },
        store,
      });

      const loadDialog = wrapper.findComponent({ ref: "loadDialog" });

      expect(loadDialog.exists()).toBe(true);
    });

    it("closes the loading dialog when loading is finished", async () => {
      const wrapper = shallowMount(TheDialog, {
        localVue,
        vuetify,
        router,
        data() {
          return {
            loading: true,
            showLoadingDialog: true,
          };
        },
        store,
      });

      const loadDialog = wrapper.findComponent({ ref: "loadDialog" });

      await wrapper.setData({ loading: false });

      expect(loadDialog.exists()).toBe(false);
    });

    it("does NOT show loading animation if there's 2 players or more", async () => {
      const wrapper = shallowMount(TheDialog, {
        localVue,
        vuetify,
        router,
        data() {
          return {
            loading: true,
            showLoadingDialog: true,
          };
        },
        store,
      });

      await wrapper.setData({ playerAmount: 2 });

      const loadingAnim = wrapper.findComponent({ ref: "loadingAnim" });

      expect(loadingAnim.exists()).toBe(false);
    });

    it("shows the play button ONLY when there's 2 players or more", async () => {
      const wrapper = shallowMount(TheDialog, {
        localVue,
        vuetify,
        router,
        data() {
          return {
            isHost: true,
            showLoadingDialog: true,
            playerAmount: 1,
          };
        },
        store,
      });

      let btn = wrapper.findComponent({ ref: "startBtn" });

      expect(btn.exists()).toBe(false);

      await wrapper.setData({ playerAmount: 2 });

      btn = wrapper.findComponent({ ref: "startBtn" });

      expect(btn.exists()).toBe(true);
    });

    it("emits a startGame event to the server", async () => {
      const wrapper = shallowMount(TheDialog, {
        localVue,
        vuetify,
        router,
        data() {
          return {
            isHost: true,
            showLoadingDialog: true,
            playerAmount: 4,
          };
        },
        store,
      });

      const spy = jest.spyOn(wrapper.vm, "startGame").mockResolvedValueOnce();

      await wrapper.findComponent({ ref: "startBtn" }).trigger("click");

      expect(spy).toBeCalledTimes(1);
    });

    it("does show loading if startGame event was sent", async () => {
      await wrapper.setData({
        showLoadingDialog: true,
        isHost: true,
        gameStarted: true,
      });

      const loading = wrapper.findComponent({ ref: "loadingAnim" });

      expect(loading.exists()).toBe(true);
    });
  });
});
