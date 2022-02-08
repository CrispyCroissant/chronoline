import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuetify from "vuetify";
import Vuex from "vuex";
import CardCreateRoom from "@/components/StartGame/CardCreateRoom.vue";

describe("The start game page", () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  let vuetify, store;

  beforeEach(() => {
    vuetify = new Vuetify();
    store = new Vuex.Store({
      state: {},
      mutations: {},
    });
  });

  it("exists", () => {
    const wrapper = shallowMount(CardCreateRoom, {
      localVue,
      vuetify,
      store,
    });
    expect(wrapper.exists()).toBe(true);
  });

  it("redirects to playing page on room creation click", async () => {
    const wrapper = shallowMount(CardCreateRoom, {
      localVue,
      vuetify,
      store,
      data() {
        return {
          formValid: true,
        };
      },
    });

    const spy = jest.spyOn(wrapper.vm, "goToRoom").mockReturnValueOnce();

    await wrapper.findComponent({ ref: "createRoomBtn" }).trigger("click");

    expect(spy).toBeCalledTimes(1);
  });

  it("does not redirects to playing page if no nickname was provided", async () => {
    const wrapper = shallowMount(CardCreateRoom, {
      localVue,
      vuetify,
      store,
      mocks: {
        $router: {
          push: jest.fn(),
        },
      },
    });

    const spy = jest.spyOn(wrapper.vm.$router, "push");

    await wrapper.findComponent({ ref: "createRoomBtn" }).trigger("click");

    expect(spy).toBeCalledTimes(0);
  });

  it("returns error in text field if no nickname was provided", async () => {
    const wrapper = shallowMount(CardCreateRoom, {
      localVue,
      vuetify,
      store,
    });

    const returnedVal = wrapper.vm.required();

    expect(typeof returnedVal).toBe("string");
  });
});
