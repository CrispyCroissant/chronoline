<template>
  <v-app>
    <v-main>
      <v-scale-transition mode="out-in">
        <router-view />
      </v-scale-transition>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
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
