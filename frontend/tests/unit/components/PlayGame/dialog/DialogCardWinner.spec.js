import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuetify from "vuetify";
import VueRouter from "vue-router";
import DialogCardWinner from "@/components/PlayGame/dialog/DialogCardWinner.vue";

describe("The winner card", () => {
  const localVue = createLocalVue();
  localVue.use(VueRouter);
  let vuetify, router;
  let wrapper;

  beforeEach(() => {
    vuetify = new Vuetify();
    router = new VueRouter();

    wrapper = shallowMount(DialogCardWinner, {
      localVue,
      vuetify,
      router,
      propsData: {
        show: true,
      },
    });
  });

  it("is visible if it has the show prop", () => {
    expect(wrapper.isVisible()).toBe(true);
  });

  it("does NOT show if it has no provided prop or if it's false", async () => {
    await wrapper.setProps({ show: false });

    expect(wrapper.isVisible()).toBe(false);
  });

  it("executes the playAgain method on button click", async () => {
    const spy = jest.spyOn(wrapper.vm, "playAgain").mockReturnValueOnce();

    await wrapper.findComponent({ ref: "playBtn" }).trigger("click");

    expect(spy).toBeCalledTimes(1);
  });

  it("executes the goHome method on button click", async () => {
    const spy = jest.spyOn(wrapper.vm, "goHome").mockReturnValueOnce();

    await wrapper.findComponent({ ref: "homeBtn" }).trigger("click");

    expect(spy).toBeCalledTimes(1);
  });
});
