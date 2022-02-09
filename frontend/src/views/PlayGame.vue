<template>
  <v-container fluid class="d-flex flex-column">
    <v-row justify="end" align="start">
      <TheScoreboard />
    </v-row>
    <v-row justify="center" align="end">
      <PlayerCardSheet />
    </v-row>
  </v-container>
</template>

<script>
import PlayerCardSheet from "../components/PlayGame/PlayerCardSheet.vue";
import TheScoreboard from "../components/PlayGame/TheScoreboard.vue";

export default {
  components: { PlayerCardSheet, TheScoreboard },
  name: "PlayGame",
};
</script>

<style scoped>
.container {
  height: 100vh;
}
</style>
