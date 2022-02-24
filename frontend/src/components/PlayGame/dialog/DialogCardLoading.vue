<template>
  <v-card v-if="show" ref="card">
    <v-card-title class="text-h5 white--text primary d-flex justify-center">
      {{ loadingTitle }}
    </v-card-title>
    <v-card-text class="mt-5 d-flex flex-column align-center justify-center">
      <div class="clickable d-flex align-center" @click="copyToClipBoard()">
        <v-icon left>mdi-link</v-icon>
        <p class="text-caption ma-0">
          {{ currentURL }}
        </p>
      </div>
      <div class="mt-6">
        <p class="text-body-2">{{ playerAmount }} players have joined</p>
      </div>
      <v-progress-linear
        v-if="gameStarted"
        indeterminate
        color="primary"
        class="mt-1"
        ref="loadingAnim"
      ></v-progress-linear>
      <div v-if="playerAmount > 1 && !gameStarted">
        <v-btn color="primary" @click.native="startGame" ref="startBtn">
          Start game
        </v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "DialogCardLoading",
  props: ["show"],
  data() {
    return {
      playerAmount: 1,
      gameStarted: false,
    };
  },
  computed: {
    loadingTitle() {
      if (this.gameStarted) return "Starting game...";
      return "Waiting for players";
    },
    currentURL() {
      return process.env.VUE_APP_URL + this.$route.path;
    },
  },
  methods: {
    copyToClipBoard() {
      navigator.clipboard.writeText(this.currentURL);
      this.$emit("showSnackbar");
    },
    startGame() {
      this.$socket.client.emit("startGame");
      this.gameStarted = true;
    },
  },
  sockets: {
    roomConnection(playerAmount) {
      this.playerAmount = playerAmount;
    },
    startLoadingGame() {
      this.gameStarted = true;
    },
  },
};
</script>

<style scoped>
.clickable {
  cursor: pointer;
}
</style>
