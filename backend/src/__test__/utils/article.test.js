const axios = require("axios");
const { getArticleDates } = require("../../utils/article");

jest.mock("axios");

describe("getArticleDates()", () => {
  const articleCard = {
    title: "",
    desc: "",
    thumbnail: "",
    url: "",
    wikibaseItem: "Q229760",
  };

  const responseDateProp = {
    data: {
      entities: {
        Q229760: {
          type: "item",
          id: "Q229760",
          claims: {
            P569: [
              {
                mainsnak: {
                  snaktype: "value",
                  property: "P569",
                  datavalue: {
                    value: {
                      time: "+1990-11-26T00:00:00Z",
                    },
                  },
                },
              },
            ],
          },
        },
      },
    },
  };

  const responseNoDateProp = {
    data: {
      entities: {
        Q229760: {
          type: "item",
          id: "Q229760",
          claims: {
            P25: [
              {
                mainsnak: {
                  snaktype: "value",
                },
              },
            ],
          },
        },
      },
    },
  };

  it("should throw an error if no articles were provided", async () => {
    expect.assertions(1);
    try {
      await getArticleDates();
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it("should throw an error if HTTP request failed or returned an error", async () => {
    jest.spyOn(axios, "get").mockRejectedValueOnce(null);

    expect.assertions(1);
    try {
      await getArticleDates([]);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it("should remove articles without a time/date property", async () => {
    jest.spyOn(axios, "get").mockResolvedValueOnce(responseNoDateProp);

    const returnedArticles = await getArticleDates([articleCard]);

    expect(returnedArticles.length).toBe(0);
  });

  it("should return articles with a time/date property", async () => {
    jest.spyOn(axios, "get").mockResolvedValueOnce(responseDateProp);

    const returnedArticles = await getArticleDates([articleCard]);

    expect(returnedArticles.length).toBe(1);
  });

  it("should return article with time and time type", async () => {
    jest.spyOn(axios, "get").mockResolvedValueOnce(responseDateProp);

    const returnedArticles = await getArticleDates([articleCard]);
    const article = returnedArticles[0];

    expect(article.date).toBe("+1990-11-26T00:00:00Z");
    expect(article.timeType).toBe("born");
  });
});
