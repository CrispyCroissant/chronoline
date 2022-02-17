<template>
  <v-sheet v-if="render" color="primary" class="pa-10" rounded="xl">
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
      return `${this.$store.state.currentPlayerTurn}'s turn`;
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
