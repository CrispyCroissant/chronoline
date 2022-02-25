import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuetify from "vuetify";
import Vuex from "vuex";
import DialogCardNickname from "@/components/PlayGame/dialog/DialogCardNickname.vue";

describe("The nicnkame dialog", () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  let vuetify, store;
  let wrapper;

  beforeEach(() => {
    vuetify = new Vuetify();
    store = new Vuex.Store({
      state: {},
      mutations: {},
    });

    wrapper = shallowMount(DialogCardNickname, {
      localVue,
      vuetify,
      store,
      propsData: {
        show: true,
      },
    });
  });

  it("exists", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("shows the card if show prop is true", () => {
    const card = wrapper.findComponent({ ref: "nicknameDialog" });

    expect(card.exists()).toBe(true);
  });

  it("does NOT show if the show prop is false", async () => {
    await wrapper.setProps({ show: false });

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
