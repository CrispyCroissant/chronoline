<template>
  <v-app>
    <v-main>
      <v-scale-transition mode="out-in">
        <router-view />
      </v-scale-transition>
    </v-main>
    <TheFooter v-if="this.$route.meta.hasFooter" />
  </v-app>
</template>

<script>
import TheFooter from "./components/nav/TheFooter.vue";

export default {
  name: "App",
  components: { TheFooter },
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}

#app {
  background: #f6f7eb;
}
</style>
