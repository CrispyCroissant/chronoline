<template>
  <v-sheet class="pa-10" width="100%" elevation="5">
    <v-row justify="center" class="mb-10" ref="titleRow">
      <v-col cols="12" class="d-flex justify-end pa-0">
        <v-btn icon small ref="sizeBtn" @click.native="minimized = !minimized">
          <v-icon v-if="!minimized" color="accent">mdi-chevron-down</v-icon>
          <v-icon v-if="minimized" color="accent">mdi-chevron-up</v-icon>
        </v-btn>
      </v-col>
      <h2 class="text-h3 font-weight-bold onyx--text">Your cards</h2>
    </v-row>
    <v-expand-transition>
      <div v-show="!minimized">
        <v-row justify="end" ref="sheetContent">
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
      </div>
    </v-expand-transition>
  </v-sheet>
</template>

<script>
import ThePlayersMenu from "./ThePlayersMenu.vue";
import PlayerCard from "./PlayingCard.vue";

export default {
  components: { PlayerCard, ThePlayersMenu },
  name: "ThePlayerCardSheet",
  data() {
    return {
      minimized: false,
    };
  },
};
</script>

<style></style>
