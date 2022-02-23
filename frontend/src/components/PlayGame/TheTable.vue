<template>
  <v-sheet
    v-if="render"
    class="px-10 py-16"
    color="onyx"
    elevation="4"
    rounded="xl"
    width="98%"
  >
    <v-row>
      <drop-list
        :items="cards"
        @insert="onDrop"
        mode="cut"
        class="row"
        :drag-image-opacity="0"
      >
        <template v-slot:item="{ item, index }">
          <v-col cols="auto" :key="item.title">
            <PlayingCard
              :card="item"
              :onTable="true"
              @mouseover.native="addHover(index)"
              @mouseleave.native="removeHover(index)"
              class="fade"
              :ref="'card' + index"
            />
          </v-col>
        </template>
        <template v-slot:feedback="{ data }">
          <v-col cols="auto" :key="data.title">
            <PlayingCard :card="data" />
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
    addHover(index) {
      // TODO: Don't add hover effect is mouse is clicked.
      if (this.cards.length === 1) {
        return;
      }

      for (let i = 0; i < this.cards.length; i++) {
        if (i === index) continue;
        const card = this.$refs[`card${i}`].$el;
        card.classList.add("transparent");
      }
      this.$refs[`card${index}`].$el.classList.add("hovered");
    },
    removeHover(index) {
      if (this.cards.length === 1) {
        return;
      }

      for (let i = 0; i < this.cards.length; i++) {
        if (i === index) continue;
        const card = this.$refs[`card${i}`].$el;
        card.classList.remove("transparent");
      }
      this.$refs[`card${index}`].$el.classList.remove("hovered");
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
.fade {
  transition: all 0.3s ease-out;
  transition-property: margin, opacity;
}
.hovered {
  position: absolute;
  margin: -1rem 0;
  z-index: 1;
}
.transparent {
  opacity: 5%;
  z-index: 0;
}
</style>
