<template>
  <v-sheet color="transparent" class="mr-5 mt-5" v-if="render">
    <v-row justify="center" class="mb-1">
      <v-btn icon @click.native="show = !show" ref="showBtn">
        <v-icon color="secondary">
          {{ show ? "mdi-eye-off" : "mdi-eye" }}
        </v-icon>
      </v-btn>
    </v-row>
    <v-expand-transition mode="out-in">
      <div v-if="show">
        <hr />
        <v-row justify="center">
          <v-col class="pb-0 mt-2">
            <p class="text-caption text-center pa-0 ma-0 mb-3">Player</p>
          </v-col>
          <v-col class="pb-0 mt-2">
            <p class="text-caption text-center pa-0 ma-0 mb-3">Cards</p>
          </v-col>
        </v-row>
        <v-list ref="playerList" color="transparent" dense>
          <v-list-item v-for="player in players" :key="player.nickname">
            <v-list-item-title class="text-caption">
              {{ player.nickname }}
            </v-list-item-title>
            <v-list-item-action class="text-caption ml-15">
              {{ player.cardAmount }}
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </div>
    </v-expand-transition>
  </v-sheet>
</template>

<script>
export default {
  name: "TheScoreboard",
  data() {
    return {
      render: false,
      show: true,
    };
  },
  computed: {
    players() {
      return this.$store.getters.playerLeaderboard;
    },
  },
  sockets: {
    initGame() {
      this.render = true;
    },
  },
};
</script>

<style></style>
