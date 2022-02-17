<template>
  <v-sheet class="pa-10" width="100%" elevation="5" v-if="render">
    <v-row justify="center" class="mb-10" ref="titleRow">
      <v-col cols="12" class="d-flex justify-end pa-0">
        <v-btn icon small ref="sizeBtn" @click.native="minimized = !minimized">
          <v-icon v-if="!minimized" color="accent">mdi-chevron-down</v-icon>
          <v-icon v-if="minimized" color="accent">mdi-chevron-up</v-icon>
        </v-btn>
      </v-col>
      <h2 class="text-h3 font-weight-bold onyx--text">{{ title }}</h2>
    </v-row>
    <v-expand-transition>
      <div v-show="!minimized">
        <v-row justify="end" ref="sheetContent">
          <v-col cols="2">
            <ThePlayersMenu @changePlayer="changePlayer" />
          </v-col>
          <v-spacer></v-spacer>
          <drag
            v-for="card in cards"
            :key="card.title"
            :data="card"
            :drag-image-opacity="0.9"
            :disabled="!myTurn"
            go-back
            @cut="onCut"
          >
            <PlayerCard :card="card" ref="sheetCards" />
          </drag>
        </v-row>
      </div>
    </v-expand-transition>
  </v-sheet>
</template>

<script>
import ThePlayersMenu from "./ThePlayersMenu.vue";
import PlayerCard from "./PlayingCard.vue";
import { Drag } from "vue-easy-dnd";

export default {
  components: { PlayerCard, ThePlayersMenu, Drag },
  name: "ThePlayerCardSheet",
  data() {
    return {
      render: false,
      minimized: false,
      cards: [],
      title: "Your cards",
      draggedCard: {},
    };
  },
  computed: {
    myTurn() {
      return this.$store.getters.isYourTurn;
    },
  },
  methods: {
    //TODO: Write tests for these methods
    changePlayer(playerName) {
      this.getCards(playerName);

      if (playerName === this.$store.state.nickname) {
        this.title = "Your cards";
      } else {
        this.title = `${playerName}'s cards`;
      }
    },
    getCards(name) {
      this.cards = this.$store.getters.playersCards(name);
    },
    onCut(e) {
      const i = this.cards.findIndex((card) => {
        return card === e.data;
      });
      this.cards.splice(i, 1);
    },
  },
  sockets: {
    initGame() {
      this.render = true;
      this.getCards(this.$store.state.nickname);
    },
    playerUpdate() {
      this.getCards(this.$store.state.nickname);
    },
  },
};
</script>

<style scoped>
.hide {
  visibility: hidden;
}
.show {
  visibility: visible;
}
</style>
