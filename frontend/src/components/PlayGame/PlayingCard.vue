<template>
  <v-sheet
    elevation="5"
    class="card"
    rounded="lg"
    max-width="10rem"
    draggable="true"
    @click="displayYear"
    v-if="card"
  >
    <v-sheet :color="titleColor" rounded="lg b-0">
      <p class="text-body-2 text-center white--text ma-0 pa-3">
        {{ card.title }}
      </p>
    </v-sheet>
    <v-row justify="center" class="my-2">
      <v-col cols="12" class="ma-0 pa-0">
        <p class="text-caption text-center text-wrap ma-0 pa-2 onyx--text">
          {{ card.timeType }}
        </p>
      </v-col>
      <v-col cols="12" class="d-flex justify-center pa-0">
        <v-img
          :src="card.thumbnail"
          max-height="110px"
          max-width="140px"
          contain
          class="mb-3 rounded-lg"
        />
      </v-col>
    </v-row>
    <v-expand-transition>
      <v-sheet
        v-if="!showYear || (!onTable && showDesc)"
        color="grey lighten-3"
        rounded="lg t-0"
      >
        <p class="text-caption text-center text-wrap ma-0 pa-2 onyx--text">
          {{ card.desc }}
        </p>
      </v-sheet>
    </v-expand-transition>
    <v-expand-transition>
      <v-sheet v-if="showYear && onTable" :color="yearColor" rounded="lg t-0">
        <p class="text-caption text-center text-wrap ma-0 pa-2 white--text">
          {{ new Date(card.date).getFullYear() }}
        </p>
      </v-sheet>
    </v-expand-transition>
  </v-sheet>
</template>

<script>
export default {
  name: "PlayingCard",
  props: ["card", "onTable", "correct"],
  data() {
    return {
      showYear: true,
      showDesc: true,
    };
  },
  methods: {
    displayYear() {
      if (this.onTable) {
        this.showYear = !this.showYear;
      }
    },
  },
  computed: {
    yearColor() {
      if (!this.correct) {
        return "error";
      }
      return "success";
    },
    titleColor() {
      if (this.onTable) {
        return "secondary";
      }
      return "primary";
    },
  },
};
</script>

<style scoped>
.card {
  cursor: pointer;
}
</style>
