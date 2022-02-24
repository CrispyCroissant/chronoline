<template>
  <v-card v-if="show">
    <v-card-title class="text-h5 white--text success d-flex justify-center">
      WINNER
    </v-card-title>
    <v-card-text class="mt-5 d-flex flex-column align-center justify-center">
      <v-icon x-large color="amber">mdi-medal</v-icon>
      <p class="text-body-1 mb-0 mt-5">
        <span class="font-weight-bold">{{ winner }}</span> has won the game!
      </p>
      <p class="text-caption mb-0 mt-5">The rest stood no chance...</p>
    </v-card-text>
    <v-card-actions>
      <v-btn ref="playBtn" color="primary" @click.native="playAgain" text>
        Play again?
      </v-btn>
      <v-btn ref="homeBtn" color="secondary" @click.native="goHome" text>
        Close
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
const audioWin = new Audio(require("@/assets/winner.mp3"));
audioWin.volume = 0.2;

export default {
  name: "DialogCardWinner",
  props: ["show", "winner"],
  methods: {
    playAgain() {
      this.$socket.client.emit("resetGame");
    },
    goHome() {
      this.$router.push({ name: "Home" });
    },
  },
  sockets: {
    gameFinished() {
      audioWin.play();
    },
  },
};
</script>

<style></style>
