<template>
  <v-app
    id="main"
    :style="{ background: $vuetify.theme.themes[theme].background }"
  >
    <v-main>
      <ThemeToggler />
      <v-scale-transition mode="out-in">
        <router-view />
      </v-scale-transition>
    </v-main>
    <TheFooter v-if="this.$route.meta.hasFooter" />
  </v-app>
</template>

<script>
import TheFooter from "./components/nav/TheFooter.vue";
import ThemeToggler from "./components/ui/ThemeToggler.vue";

export default {
  name: "App",
  components: { TheFooter, ThemeToggler },
  computed: {
    theme() {
      if (this.$vuetify.theme.dark) {
        document.querySelector("html").classList.remove("light");
        document.querySelector("html").classList.add("dark");
        return "dark";
      } else {
        document.querySelector("html").classList.remove("dark");
        document.querySelector("html").classList.add("light");
        return "light";
      }
    },
  },
  metaInfo: {
    title: "Chronoline",
    htmlAttrs: {
      lang: "en-US",
    },
    meta: [
      { charset: "utf-8" },
      {
        name: "description",
        content:
          "A multiplayer game where you have to know your timeline of historical events and the births/deaths of famous people.",
      },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { "http-equiv": "X-UA-Compatible", content: "IE=edge" },
    ],
  },
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}
html.dark {
  background-color: #082032;
}
html.light {
  background-color: #fff;
}
</style>
