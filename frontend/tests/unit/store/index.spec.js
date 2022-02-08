import { state, mutations } from "../../../src/store";

describe("The store", () => {
  it("has a nickname state", () => {
    expect(state.nickname).toBeDefined();
  });
});

describe("The mutations", () => {
  it("can set the nickname state", () => {
    mutations.setNickname(state, "test");

    expect(state.nickname).toBe("test");
  });
});
