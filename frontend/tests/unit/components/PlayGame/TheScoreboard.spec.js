import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuetify from "vuetify";
import TheScoreboard from "@/components/PlayGame/TheScoreboard.vue";

describe("The scoreboard", () => {
  const localVue = createLocalVue();
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it("exists", () => {
    const wrapper = shallowMount(TheScoreboard, {
      localVue,
      vuetify,
    });
    expect(wrapper.exists()).toBe(true);
  });

  it("shows scoreboard by default", () => {
    const wrapper = shallowMount(TheScoreboard, {
      localVue,
      vuetify,
    });

    const playerList = wrapper.findComponent({ ref: "playerList" });

    expect(playerList.exists()).toBe(true);
  });

  it("hides scoreboard on button click", async () => {
    const wrapper = shallowMount(TheScoreboard, {
      localVue,
      vuetify,
    });

    const playerList = wrapper.findComponent({ ref: "playerList" });
    await wrapper.findComponent({ ref: "showBtn" }).trigger("click");

    expect(playerList.exists()).toBe(false);
  });

  it("shows scoreboard on button click if hidden", async () => {
    const wrapper = shallowMount(TheScoreboard, {
      localVue,
      vuetify,
    });

    // Hide the scoreboard
    await wrapper.findComponent({ ref: "showBtn" }).trigger("click");
    // Show the scoreboard
    await wrapper.findComponent({ ref: "showBtn" }).trigger("click");

    const playerList = wrapper.findComponent({ ref: "playerList" });

    expect(playerList.exists()).toBe(true);
  });
});
