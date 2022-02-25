import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#C70039",
        secondary: "#4C7FB4",
        accent: "#2C394B",
        table: "#464C4B",
        sheet: "#F6F2F4",
        onyx: "#353839",
        background: "#fff",
      },
      dark: {
        primary: "#dc4325",
        secondary: "#334756",
        accent: "#2C394B",
        table: "#064969",
        sheet: colors.grey.lighten2,
        onyx: "#fff",
        background: "#082032",
      },
    },
  },
});
