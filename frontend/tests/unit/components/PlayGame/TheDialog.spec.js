import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuetify from "vuetify";
import VueRouter from "vue-router";
import TheDialog from "@/components/PlayGame/TheDialog.vue";

describe("The dialog", () => {
  const localVue = createLocalVue();
  localVue.use(VueRouter);
  let vuetify, router;

  beforeEach(() => {
    vuetify = new Vuetify();
    router = new VueRouter();
  });

  it("exists", () => {
    const wrapper = shallowMount(TheDialog, {
      localVue,
      vuetify,
      router,
    });
    expect(wrapper.exists()).toBe(true);
  });

  it("shows the invitation link version first", () => {
    const wrapper = shallowMount(TheDialog, {
      localVue,
      vuetify,
      router,
    });

    const inviteDialog = wrapper.findComponent({ ref: "inviteDialog" });
    const loadDialog = wrapper.findComponent({ ref: "loadDialog" });

    expect(inviteDialog.exists()).toBe(true);
    expect(loadDialog.exists()).toBe(false);
  });

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
    });

    const loadDialog = wrapper.findComponent({ ref: "loadDialog" });
    const inviteDialog = wrapper.findComponent({ ref: "inviteDialog" });

    expect(loadDialog.exists()).toBe(true);
    expect(inviteDialog.exists()).toBe(false);
  });

  it("closes the invitation dialog on button click", async () => {
    const wrapper = shallowMount(TheDialog, {
      localVue,
      vuetify,
      router,
    });

    const spy = jest.spyOn(wrapper.vm, "attemptClose");

    await wrapper.findComponent({ ref: "closeBtn" }).trigger("click");

    expect(spy).toBeCalledTimes(1);
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
    });

    const loadDialog = wrapper.findComponent({ ref: "loadDialog" });

    await wrapper.setData({ loading: false });

    expect(loadDialog.exists()).toBe(false);
  });

  it("copies the URL to clipboard upon clicking the invitation link", async () => {
    const wrapper = shallowMount(TheDialog, {
      localVue,
      vuetify,
      router,
    });

    const spy = jest.spyOn(wrapper.vm, "copyToClipBoard");

    await wrapper.findComponent({ ref: "invitationLink" }).trigger("click");

    expect(spy).toBeCalledTimes(1);
  });

  it("shows a tooltip upon clicking the invitation link", async () => {
    const wrapper = shallowMount(TheDialog, {
      localVue,
      vuetify,
      router,
    });

    await wrapper.findComponent({ ref: "invitationLink" }).trigger("click");

    const tooltip = wrapper.findComponent({ ref: "snackbar" });

    expect(tooltip.isVisible()).toBe(true);
  });
});
