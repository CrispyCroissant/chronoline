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

    <DialogCardLoading
      :show="showLoadingDialog && isHost"
      @showSnackbar="showSnackbar = true"
    />

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
import DialogCardLoading from "./DialogCardLoading.vue";
import DialogCardNickname from "./DialogCardNickname.vue";

const audioWin = new Audio(require("@/assets/winner.mp3"));
audioWin.volume = 0.2;

export default {
  components: { DialogCardNickname, DialogCardLoading },
  name: "TheDialog",
  data() {
    return {
      dialog: true,
      showLoadingDialog: true,
      showSnackbar: false,
      isHost: false,
      winner: "",
    };
  },
  methods: {
    playAgain() {
      this.$socket.client.emit("resetGame");
    },
    goHome() {
      this.$router.push({ name: "Home" });
    },
    showLoading() {
      this.showLoadingDialog = true;
      this.isHost = true;
    },
  },
  computed: {
    nickname: {
      get() {
        return this.$store.state.nickname;
      },
      set(nickname) {
        this.$store.commit("setNickname", nickname);
      },
    },
  },
  sockets: {
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
    gameFinished(player) {
      this.showLoadingDialog = false;
      this.dialog = true;
      this.winner = player.nickname;

      audioWin.play();
    },
    gameIsReset() {
      this.$socket.client.emit("startGame");
    },
    startLoadingGame() {
      this.showLoading();
      this.winner = "";
    },
  },
  mounted() {
    if (this.$store.state.nickname) {
      this.isHost = true;
    }
  },
};
</script>

<style scoped></style>
