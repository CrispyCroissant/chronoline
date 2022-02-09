<template>
  <v-container fluid fill-height>
    <v-row justify="center"></v-row>
    <v-row justify="center">
      <PlayerCardSheet />
    </v-row>
  </v-container>
</template>

<script>
import PlayerCardSheet from "../components/PlayGame/PlayerCardSheet.vue";

export default {
  components: { PlayerCardSheet },
  name: "PlayGame",
};
</script>

<style></style>
