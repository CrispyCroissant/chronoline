<template>
  <v-container fluid class="d-flex align-center justify-center">
    <v-sheet
      class="d-flex flex-column pa-10"
      height="60%"
      width="50%"
      elevation="5"
      rounded="lg"
    >
      <v-row justify="center">
        <v-icon color="error" aria-hidden="true">
          mdi-alert-circle-outline
        </v-icon>
      </v-row>
      <v-row justify="center" align="start">
        <h1 class="text-h2 onyx--text mt-5">Sorry,</h1>
      </v-row>
      <v-row justify="center" align="start">
        <p class="text-h4 text-center onyx--text">that room doesn't exist!</p>
      </v-row>
      <v-row justify="center">
        <v-btn x-large color="success" ref="homeBtn" @click.native="goHome">
          Go back
        </v-btn>
      </v-row>
    </v-sheet>
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
  metaInfo: {
    titleTemplate: "%s | Not found",
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
