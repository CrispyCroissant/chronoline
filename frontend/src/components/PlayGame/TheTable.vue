<template>
  <v-sheet
    class="px-10 py-16"
    color="onyx"
    elevation="4"
    rounded="xl"
    width="98%"
  >
    <v-row v-if="render">
      <v-col cols="2" v-for="card in cards" :key="card.title">
        <PlayingCard
          :card="card"
          :onTable="true"
          :correct="true"
          class="mx-2"
        />
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script>
import PlayingCard from "./PlayingCard.vue";

export default {
  components: { PlayingCard },
  name: "TheTable",
  data() {
    return {
      render: false,
    };
  },
  computed: {
    cards() {
      return this.$store.state.cardsOnTable;
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
