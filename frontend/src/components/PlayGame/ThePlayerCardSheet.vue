<template>
  <v-sheet
    class="pa-10 pt-3"
    max-width="100%"
    rounded="lg"
    elevation="5"
    v-if="render"
    :width="sheetWidth"
    ref="cardSheet"
  >
    <v-row justify="center" ref="titleRow">
      <v-col cols="12" class="d-flex justify-end pa-0 mt-2">
        <v-btn
          icon
          small
          ref="sizeBtn"
          @click.native="
            setSheetWidth();
            minimized = !minimized;
          "
        >
          <v-icon v-if="!minimized" color="accent">mdi-chevron-down</v-icon>
          <v-icon v-if="minimized" color="accent">mdi-chevron-up</v-icon>
        </v-btn>
      </v-col>
      <h2 class="text-h4 mb-10 font-weight-bold onyx--text">
        {{ title }}
        <v-divider></v-divider>
      </h2>
    </v-row>
    <v-expand-transition>
      <div v-show="!minimized">
        <v-row
          justify="space-around"
          align="center"
          ref="sheetContent"
          no-gutters
        >
          <v-col cols="auto">
            <ThePlayersMenu class="mr-8" @changePlayer="changePlayer" />
          </v-col>
          <drag
            v-for="card in cards"
            :key="card.title"
            :data="card"
            :drag-image-opacity="1"
            :disabled="!dragAllowed || !myTurn"
            go-back
            @cut="onCut"
            class="col auto d-flex justify-center"
          >
            <PlayerCard :card="card" class="mx-3" ref="sheetCards" />
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
      dragAllowed: true,
      sheetWidth: null,
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
        this.dragAllowed = true;
      } else {
        this.title = `${playerName}'s cards`;
        this.dragAllowed = false;
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
    setSheetWidth() {
      this.sheetWidth = this.$refs.cardSheet.$el.clientWidth;
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

<style scoped></style>
