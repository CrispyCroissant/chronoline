import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuetify from "vuetify";
import Vuex from "vuex";
import TheScoreboard from "@/components/PlayGame/TheScoreboard.vue";

describe("The scoreboard", () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  let vuetify, store, wrapper;

  beforeEach(() => {
    vuetify = new Vuetify();
    store = new Vuex.Store({
      state: {},
      getters: {},
    });

    wrapper = shallowMount(TheScoreboard, {
      localVue,
      vuetify,
      store,
    });
  });

  it("exists", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("shows scoreboard by default", () => {
    const playerList = wrapper.findComponent({ ref: "playerList" });

    expect(playerList.exists()).toBe(true);
  });

  it("hides scoreboard on button click", async () => {
    const playerList = wrapper.findComponent({ ref: "playerList" });
    await wrapper.findComponent({ ref: "showBtn" }).trigger("click");

    expect(playerList.exists()).toBe(false);
  });

  it("shows scoreboard on button click if hidden", async () => {
    // Hide the scoreboard
    await wrapper.findComponent({ ref: "showBtn" }).trigger("click");
    // Show the scoreboard
    await wrapper.findComponent({ ref: "showBtn" }).trigger("click");

    const playerList = wrapper.findComponent({ ref: "playerList" });

    expect(playerList.exists()).toBe(true);
  });
});
