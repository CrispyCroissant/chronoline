import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuetify from "vuetify";
import ThemeToggler from "@/components/ui/ThemeToggler.vue";

describe("The theme toggler", () => {
  const localVue = createLocalVue();
  let vuetify, wrapper;

  beforeEach(() => {
    vuetify = new Vuetify({
      theme: {
        dark: true,
      },
    });

    wrapper = shallowMount(ThemeToggler, {
      localVue,
      vuetify,
    });
  });

  it("exists", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("toggles theme on button click", async () => {
    const spy = jest.spyOn(wrapper.vm, "toggleTheme");

    await wrapper.findComponent({ ref: "btn" }).trigger("click");

    expect(spy).toBeCalledTimes(1);
  });

  it("is yellow if dark mode is enabled", () => {
    expect(wrapper.vm.color).toBe("yellow darken-1");
  });

  it("is secondary color if light mode is enabled", () => {
    wrapper.vm.$vuetify.theme.dark = false;
    expect(wrapper.vm.color).toBe("secondary");
  });

  it("changes the icon to a sun if dark mode is enabled", () => {
    expect(wrapper.vm.icon).toBe("mdi-white-balance-sunny");
  });

  it("changes the icon to a moon if light mode is enabled", () => {
    wrapper.vm.$vuetify.theme.dark = false;
    expect(wrapper.vm.icon).toBe("mdi-weather-night");
  });
});
