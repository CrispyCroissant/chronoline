import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuetify from "vuetify";
import Vuex from "vuex";
import CardCreateRoom from "@/components/StartGame/CardCreateRoom.vue";

describe("The start game page", () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  let vuetify, store;
  let wrapper, wrapperDiscon;

  beforeEach(() => {
    vuetify = new Vuetify();
    store = new Vuex.Store({
      state: {},
      mutations: {},
    });

    const options = {
      localVue,
      vuetify,
      store,
      mocks: {
        $socket: { disconnected: false },
      },
    };
    wrapper = shallowMount(CardCreateRoom, options);
    wrapperDiscon = shallowMount(CardCreateRoom, {
      ...options,
      mocks: {
        $socket: { disconnected: true },
      },
    });
  });

  it("exists", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("redirects to playing page on room creation click", async () => {
    wrapper.data = () => {
      return { formValid: true };
    };

    const spy = jest.spyOn(wrapper.vm, "goToRoom").mockReturnValueOnce();

    await wrapper.findComponent({ ref: "createRoomBtn" }).trigger("click");

    expect(spy).toBeCalledTimes(1);
  });

  it("does not redirect to playing page if no nickname was provided", async () => {
    wrapper = shallowMount(CardCreateRoom, {
      localVue,
      vuetify,
      store,
      mocks: {
        $socket: { disconnected: false },
        $router: {
          push: jest.fn(),
        },
      },
    });

    const spy = jest.spyOn(wrapper.vm.$router, "push");

    await wrapper.findComponent({ ref: "createRoomBtn" }).trigger("click");

    expect(spy).toBeCalledTimes(0);
  });

  it("disables all buttons if not connected to socket", () => {
    const buttons = wrapperDiscon.findAllComponents({ name: "v-btn" });

    for (let i = 0; i < buttons.length; i++) {
      const button = buttons.at(i);
      expect(button.attributes("disabled")).toBe("true");
    }
  });

  it("disables the nickname input if not connected to socket", () => {
    const input = wrapperDiscon.findComponent({ ref: "nameInput" });

    expect(input.attributes("disabled")).toBe("true");
  });

  it("returns error in text field if no nickname was provided", () => {
    const returnedVal = wrapper.vm.required();

    expect(typeof returnedVal).toBe("string");
  });

  it("shows the error alert if not connected to socket", () => {
    const alert = wrapperDiscon.findComponent({ ref: "alert" });

    expect(alert.exists()).toBe(true);
  });

  it("does NOT show the error alert if connected to socket", () => {
    const alert = wrapper.findComponent({ ref: "alert" });

    expect(alert.exists()).toBe(false);
  });
});
