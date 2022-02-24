<template>
  <v-dialog persistent v-model="dialog" max-width="20rem">
    <v-snackbar
      v-model="showSnackbar"
      class="snackbar"
      timeout="2500"
      ref="success"
      color="success"
      content-class="text-center"
    >
      Link copied!
    </v-snackbar>

    <!-- TODO: Refactor all cards into their own components. -->
    <DialogCardNickname :show="!isHost" @roomJoined="showLoading" />

    <v-expand-transition>
      <v-card v-if="showLoadingDialog && isHost" ref="loadDialog">
        <v-card-title class="text-h5 white--text primary d-flex justify-center">
          {{ loadingTitle }}
        </v-card-title>
        <v-card-text
          class="mt-5 d-flex flex-column align-center justify-center"
        >
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
          <v-expand-transition mode="out-in">
            <v-btn
              v-if="playerAmount > 1 && !gameStarted"
              color="primary"
              @click.native="startGame"
              ref="startBtn"
            >
              Start game
            </v-btn>
          </v-expand-transition>
        </v-card-text>
      </v-card>
    </v-expand-transition>

    <v-card v-if="winner">
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
        <v-btn color="primary" @click="playAgain" text>Play again?</v-btn>
        <v-btn color="secondary" @click="goHome" text>Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import DialogCardNickname from "./DialogCardNickname.vue";

const audioWin = new Audio(require("@/assets/winner.mp3"));
audioWin.volume = 0.2;

export default {
  components: { DialogCardNickname },
  name: "TheDialog",
  data() {
    return {
      dialog: true,
      showLoadingDialog: true,
      showSnackbar: false,
      isHost: false,
      formValid: false,
      playerAmount: 1,
      gameStarted: false,
      winner: "",
    };
  },
  methods: {
    copyToClipBoard() {
      this.showSnackbar = true;
      navigator.clipboard.writeText(this.currentURL);
    },
    startGame() {
      this.$socket.client.emit("startGame");
      this.gameStarted = true;
      this.takenNames = [];
    },
    playAgain() {
      this.$socket.client.emit("resetGame");
    },
    goHome() {
      this.$router.push({ name: "Home" });
    },
    startLoad() {
      this.gameStarted = true;
      this.showLoadingDialog = true;
      this.winner = "";
    },
    showLoading() {
      this.showLoadingDialog = true;
      this.isHost = true;
    },
  },
  computed: {
    currentURL() {
      return process.env.VUE_APP_URL + this.$route.path;
    },
    nickname: {
      get() {
        return this.$store.state.nickname;
      },
      set(nickname) {
        this.$store.commit("setNickname", nickname);
      },
    },
    loadingTitle() {
      if (this.gameStarted) {
        return "Starting game...";
      }
      return "Waiting for players";
    },
  },
  sockets: {
    roomConnection(playerAmount) {
      this.playerAmount = playerAmount;
    },
    nameTaken() {
      // This shows the loading dialog
      this.isHost = false;
      this.showLoadingDialog = false;
    },
    initGame(roomData) {
      const { deck, table, players, currentTurn } = roomData;

      this.$store.commit("setCardDeck", deck);
      this.$store.commit("setCardsOnTable", table);
      this.$store.commit("setPlayers", players);
      this.$store.commit("setCurrentTurn", currentTurn);
      this.dialog = false;
    },
    startLoadingGame() {
      this.startLoad();
    },
    gameFinished(player) {
      this.showLoadingDialog = false;
      this.dialog = true;
      this.winner = player.nickname;

      audioWin.play();
    },
    gameIsReset() {
      this.$socket.client.emit("startGame");
      this.startLoad();
    },
  },
  mounted() {
    if (this.$store.state.nickname) {
      this.isHost = true;
    }
  },
};
</script>

<style scoped>
.clickable {
  cursor: pointer;
}
</style>
