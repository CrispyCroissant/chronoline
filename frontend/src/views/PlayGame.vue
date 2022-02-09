<template>
  <v-container fluid class="d-flex flex-column">
    <TheDialog />
    <v-row justify="end" align="start">
      <TheScoreboard />
    </v-row>
    <v-row justify="center" align="end">
      <ThePlayerCardSheet />
    </v-row>
  </v-container>
</template>

<script>
import TheDialog from "../components/PlayGame/TheDialog.vue";
import ThePlayerCardSheet from "../components/PlayGame/ThePlayerCardSheet.vue";
import TheScoreboard from "../components/PlayGame/TheScoreboard.vue";

export default {
  components: { TheScoreboard, ThePlayerCardSheet, TheDialog },
  name: "PlayGame",
};
</script>

<style scoped>
.container {
  height: 100vh;
}
</style>
