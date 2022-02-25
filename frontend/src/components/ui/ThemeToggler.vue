<template>
  <v-btn
    class="button"
    ref="btn"
    icon
    @click.native="toggleTheme"
    aria-label="Light/Dark theme toggle button"
  >
    <v-icon x-large :color="color">{{ icon }}</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: "ThemeToggler",
  computed: {
    color() {
      if (this.$vuetify.theme.dark) return "yellow darken-1";
      return "secondary";
    },
    icon() {
      if (this.$vuetify.theme.dark) return "mdi-white-balance-sunny";
      return "mdi-weather-night";
    },
  },
  methods: {
    toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
  },
};
</script>

<style scoped>
.button {
  position: absolute;
  top: 2rem;
  left: 2rem;
}
</style>
