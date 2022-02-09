<template>
  <v-sheet class="pa-10" min-width="50rem" elevation="5">
    <v-row justify="center" class="mb-10">
      <h2 class="text-h2 font-weight-bold onyx--text">Your cards</h2>
    </v-row>
    <v-row justify="end">
      <v-col cols="2">
        <MenuPlayers />
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
import MenuPlayers from "./MenuPlayers.vue";
import PlayerCard from "./PlayingCard.vue";

export default {
  components: { PlayerCard, MenuPlayers },
  name: "PlayerCardSheet",
};
</script>

<style></style>
