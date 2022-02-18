<template>
  <v-sheet
    class="px-10 py-16"
    color="onyx"
    elevation="4"
    rounded="xl"
    width="98%"
  >
    <v-row v-if="render">
      <drop-list
        :items="cards"
        @insert="onDrop"
        mode="cut"
        class="row"
        :drag-image-opacity="0"
      >
        <template v-slot:item="{ item }">
          <v-col :key="item.title" cols="2">
            <PlayingCard :card="item" :onTable="true" class="mx-2" />
          </v-col>
        </template>
        <template v-slot:feedback="{ data }">
          <PlayingCard :card="data" class="mx-2" :key="data.title" />
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
