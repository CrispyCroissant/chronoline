<template>
  <v-container fluid class="d-flex flex-column">
    <TheDialog />
    <v-row justify="space-between" align="center">
      <v-row justify="start" class="ml-16">
        <h3 class="text-h2">Chronoline</h3>
      </v-row>
      <TheScoreboard />
    </v-row>
    <v-row justify="center" align="center">
      <TheTable />
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
import TheTable from "../components/PlayGame/TheTable.vue";

export default {
  components: { TheScoreboard, ThePlayerCardSheet, TheDialog, TheTable },
  name: "PlayGame",
};
</script>

<style scoped>
.container {
  height: 100vh;
}
</style>
