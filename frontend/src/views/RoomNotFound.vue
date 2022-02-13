<template>
  <v-container fluid class="d-flex flex-column">
    <v-row justify="center">
      <v-icon color="primary" aria-hidden="true">
        mdi-alert-circle-outline
      </v-icon>
    </v-row>
    <v-row justify="center" align="center">
      <h1 class="text-h1 onyx--text">Sorry,</h1>
    </v-row>
    <v-row justify="center" align="start">
      <p class="text-h3 text-center onyx--text">that room doesn't exist!</p>
    </v-row>
    <v-row justify="center">
      <v-btn x-large color="primary" ref="homeBtn" @click.native="goHome">
        Go back
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "RoomNotFound",
  methods: {
    goHome() {
      this.$router.push({ name: "Home" });
    },
  },
};
</script>

<style scoped>
.container {
  height: 100%;
}
.v-icon {
  font-size: 5rem !important;
}
</style>
