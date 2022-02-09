<template>
  <v-container fluid class="d-flex flex-column">
    <v-row justify="end" align="start">
      <TheScoreboard />
    </v-row>
    <v-row justify="center" align="end">
      <ThePlayerCardSheet />
    </v-row>
  </v-container>
</template>

<script>
import ThePlayerCardSheet from "../components/PlayGame/ThePlayerCardSheet.vue";
import TheScoreboard from "../components/PlayGame/TheScoreboard.vue";

export default {
  components: { TheScoreboard, ThePlayerCardSheet },
  name: "PlayGame",
};
</script>

<style scoped>
.container {
  height: 100vh;
}
</style>
