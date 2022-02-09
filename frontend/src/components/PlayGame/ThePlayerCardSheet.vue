<template>
  <v-sheet class="pa-10" min-width="50rem" elevation="5">
    <v-row justify="center" class="mb-10">
      <h2 class="text-h2 font-weight-bold onyx--text">Your cards</h2>
    </v-row>
    <v-row justify="end">
      <v-col cols="2">
        <ThePlayersMenu />
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="2">
        <PlayerCard />
      </v-col>
      <v-col cols="2">
        <PlayerCard />
      </v-col>
      <v-col cols="2">
        <PlayerCard />
      </v-col>
      <v-col cols="2">
        <PlayerCard />
      </v-col>
      <v-col cols="2">
        <PlayerCard />
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script>
import ThePlayersMenu from "./ThePlayersMenu.vue";
import PlayerCard from "./PlayingCard.vue";

export default {
  components: { PlayerCard, ThePlayersMenu },
  name: "ThePlayerCardSheet",
};
</script>

<style></style>
