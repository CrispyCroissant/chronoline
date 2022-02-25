<template>
  <v-alert
    v-if="render"
    :type="type"
    prominent
    dense
    rounded="lg"
    elevation="3"
    icon="mdi-arrow-right-top"
  >
    {{ title }}
  </v-alert>
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
    type() {
      const nickname = this.$store.state.nickname;
      const currentTurnPlayer = this.$store.state.currentPlayerTurn;

      if (currentTurnPlayer === nickname) return "success";
      return "info";
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
