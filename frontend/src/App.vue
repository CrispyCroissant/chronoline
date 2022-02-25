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
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
  },
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}
</style>
