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

    <DialogCardNickname :show="!isHost" @roomJoined="showLoading" />
    <DialogCardLoading
      :show="showLoadingDialog && isHost"
      @showSnackbar="showSnackbar = true"
    />
    <DialogCardWinner :show="winner" :winner="winner" />
  </v-dialog>
</template>

<script>
import DialogCardLoading from "./DialogCardLoading.vue";
import DialogCardNickname from "./DialogCardNickname.vue";
import DialogCardWinner from "./DialogCardWinner.vue";

export default {
  components: { DialogCardNickname, DialogCardLoading, DialogCardWinner },
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
    showLoading() {
      this.showLoadingDialog = true;
      this.isHost = true;
    },
    hideLoading() {
      this.showLoadingDialog = false;
      this.isHost = false;
    },
  },
  sockets: {
    nameTaken() {
      this.hideLoading();
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
