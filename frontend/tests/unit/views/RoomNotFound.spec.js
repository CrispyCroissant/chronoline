import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuetify from "vuetify";
import RoomNotFound from "@/views/RoomNotFound.vue";

describe("The start game page", () => {
  const localVue = createLocalVue();
  let vuetify, wrapper;

  beforeEach(() => {
    vuetify = new Vuetify();
    wrapper = shallowMount(RoomNotFound, {
      localVue,
      vuetify,
    });
  });

  it("exists", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("redirects to the home page on button click", async () => {
    const spy = jest.spyOn(wrapper.vm, "goHome").mockResolvedValueOnce();

    await wrapper.findComponent({ ref: "homeBtn" }).trigger("click");

    expect(spy).toBeCalledTimes(1);
  });
});
