import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuetify from "vuetify";
import VueRouter from "vue-router";
import Vuex from "vuex";
import TheDialog from "@/components/PlayGame/TheDialog.vue";

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

  describe("The loading dialog", () => {
    it("shows the loading dialog when loading", () => {
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
      const inviteDialog = wrapper.findComponent({ ref: "inviteDialog" });

      expect(loadDialog.exists()).toBe(true);
      expect(inviteDialog.exists()).toBe(false);
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
  });

  describe("the invite CTA dialog", () => {
    it("shows the invitation CTA if user is host", async () => {
      await wrapper.setData({ isHost: true });

      const inviteDialog = wrapper.findComponent({ ref: "inviteDialog" });
      const loadDialog = wrapper.findComponent({ ref: "loadDialog" });

      expect(inviteDialog.exists()).toBe(true);
      expect(loadDialog.exists()).toBe(false);
    });

    it("copies the URL to clipboard upon clicking the invitation link", async () => {
      await wrapper.setData({ isHost: true });

      const spy = jest
        .spyOn(wrapper.vm, "copyToClipBoard")
        .mockImplementationOnce(() => jest.fn());

      await wrapper.findComponent({ ref: "invitationLink" }).trigger("click");

      expect(spy).toBeCalledTimes(1);
    });

    it("shows a tooltip upon clicking the invitation link", async () => {
      await wrapper.setData({ isHost: true });

      jest
        .spyOn(wrapper.vm, "copyToClipBoard")
        .mockImplementationOnce(() => jest.fn());

      await wrapper.findComponent({ ref: "invitationLink" }).trigger("click");

      const tooltip = wrapper.findComponent({ ref: "snackbar" });

      expect(tooltip.isVisible()).toBe(true);
    });

    it("closes the dialog on button click", async () => {
      await wrapper.setData({ isHost: true });

      const spy = jest.spyOn(wrapper.vm, "attemptClose");

      await wrapper.findComponent({ ref: "closeBtn" }).trigger("click");

      expect(spy).toBeCalledTimes(1);
    });
  });

  describe("the nickname dialog", () => {
    it("shows the card if user is NOT a host", () => {
      const card = wrapper.findComponent({ ref: "nicknameDialog" });

      expect(card.exists()).toBe(true);
    });

    it("does NOT show the card if user is a host", async () => {
      await wrapper.setData({ isHost: true });

      const card = wrapper.findComponent({ ref: "nicknameDialog" });

      expect(card.exists()).toBe(false);
    });

    it("joins the socket room upon clicking the play button", async () => {
      const spy = jest.spyOn(wrapper.vm, "joinRoom").mockResolvedValueOnce();

      await wrapper.findComponent({ ref: "playBtn" }).trigger("click");

      expect(spy).toBeCalledTimes(1);
    });

    it("shows an error in the input field if no nickname was provided", async () => {
      const returnedVal = wrapper.vm.required();

      expect(typeof returnedVal).toBe("string");
    });
  });
});
