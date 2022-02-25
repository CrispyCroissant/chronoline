<template>
  <v-btn ref="btn" icon @click.native="toggleTheme">
    <v-icon x-large :color="color">{{ icon }}</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: "ThemeToggler",
  computed: {
    color() {
      if (this.$vuetify.theme.dark) return "yellow";
      return "blue";
    },
    icon() {
      if (this.$vuetify.theme.dark) return "mdi-weather-sunny";
      return "mdi-moon-waning-crescent";
    },
  },
  methods: {
    toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
  },
};
</script>

<style></style>
