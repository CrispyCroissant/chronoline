<template>
  <v-sheet
    v-if="render"
    class="px-10 py-16"
    color="table"
    elevation="4"
    rounded="xl"
    width="95%"
  >
    <v-row>
      <drop-list :items="cards" @insert="onDrop" mode="cut" class="row">
        <template v-slot:item="{ item, index }">
          <v-col cols="auto" :key="item.title">
            <PlayingCard
              :card="item"
              :onTable="true"
              class="fade"
              :ref="'card' + index"
            />
          </v-col>
        </template>
        <template v-slot:feedback="{ data }">
          <v-col cols="auto" :key="data.title">
            <PlayingCard :card="data" style="visibility: hidden" />
          </v-col>
        </template>
      </drop-list>
    </v-row>
  </v-sheet>
</template>

<script>
import PlayingCard from "./PlayingCard.vue";
import { DropList } from "vue-easy-dnd";

export default {
  components: { PlayingCard, DropList },
  name: "TheTable",
  data() {
    return {
      render: false,
      playAudio: false,
    };
  },
  methods: {
    onDrop(event) {
      const { data, index } = event;
      this.$store.commit("setCardOnTable", { card: data, index });
      this.$socket.client.emit("playCard", { card: data, index });
    },
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
    tableUpdate({ table }) {
      // This event is emitted twice. This line makes the audio play only once.
      this.playAudio = !this.playAudio;

      if (this.playAudio) {
        const audio = new Audio(require("@/assets/cardPlayed.mp3"));
        audio.play();
      }

      this.$store.commit("setCardsOnTable", table);
    },
    playerUpdate({ players }) {
      this.$store.commit("setPlayers", players);
    },
  },
};
</script>

<style scoped>
.drop-list {
  width: 100%;
}
</style>
