<template>
  <v-sheet v-if="render" :color="color" class="pa-10" rounded="xl">
    <h3 class="text-h4 white--text">{{ title }}</h3>
  </v-sheet>
</template>

<script>
export default {
  name: "ThePlayerTurnTitle",
  data() {
    return {
      render: false,
    };
  },
  computed: {
    title() {
      const nickname = this.$store.state.nickname;
      const currentTurnPlayer = this.$store.state.currentPlayerTurn;

      if (currentTurnPlayer === nickname) return "Your turn";
      return `${this.$store.state.currentPlayerTurn}'s turn`;
    },
    color() {
      const nickname = this.$store.state.nickname;
      const currentTurnPlayer = this.$store.state.currentPlayerTurn;

      if (currentTurnPlayer === nickname) return "success";
      return "primary";
    },
  },
  sockets: {
    initGame() {
      this.render = true;
    },
    nextTurn({ currentTurn }) {
      this.$store.commit("setCurrentTurn", currentTurn);
    },
  },
};
</script>

<style></style>
