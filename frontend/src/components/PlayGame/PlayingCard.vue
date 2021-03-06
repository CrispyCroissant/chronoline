<template>
  <v-sheet
    elevation="5"
    class="card"
    rounded="lg"
    width="10rem"
    height="11.5rem"
    @click="displayYear"
    v-if="card"
    :color="greyedOut ? 'grey' : undefined"
  >
    <v-sheet :color="titleColor" rounded="lg b-0" class="ma-0 px-3 py-2">
      <p class="no-wrap text-caption text-center white--text">
        {{ card.title }}
      </p>
    </v-sheet>
    <v-row justify="center" class="flex-column white-bg mx-0">
      <div class="relative">
        <v-btn
          v-show="onTable"
          small
          icon
          class="wiki"
          @click="goToWiki(card.url)"
        >
          <v-icon small color="black">mdi-wikipedia</v-icon>
        </v-btn>
        <p class="text-caption text-center text-wrap ma-0 pa-2 black--text">
          {{ card.timeType }}
        </p>
      </div>
      <v-img
        :src="card.thumbnail"
        height="5rem"
        max-width="100%"
        position="75% 25%"
        :gradient="imageOverlay"
        class="white-bg"
      >
        <template #placeholder>
          <v-row
            class="ma-0"
            justify="center"
            align="center"
            style="height: 100%"
          >
            <v-progress-circular color="accent" indeterminate />
          </v-row>
        </template>
      </v-img>
    </v-row>
    <v-row justify="center" class="mx-0">
      <v-expand-transition>
        <v-sheet
          v-if="!showYear || (!onTable && showDesc)"
          color="grey lighten-3"
          rounded="lg t-0"
          width="100%"
          height="3rem"
          class="d-flex align-center justify-center"
          elevation="3"
        >
          <p class="desc text-center text-wrap ma-0 pa-2 black--text">
            {{ card.desc | truncate }}
          </p>
        </v-sheet>
      </v-expand-transition>
      <v-expand-transition>
        <v-sheet
          v-if="showYear && onTable"
          :color="yearColor"
          rounded="lg t-0"
          width="100%"
          elevation="3"
        >
          <p class="text-caption text-center text-wrap ma-0 pa-2 white--text">
            {{ new Date(card.date).getFullYear() }}
          </p>
        </v-sheet>
      </v-expand-transition>
    </v-row>
  </v-sheet>
</template>

<script>
export default {
  name: "PlayingCard",
  props: ["card", "onTable", "greyedOut"],
  data() {
    return {
      showYear: true,
      showDesc: true,
      canShowYear: true,
    };
  },
  methods: {
    displayYear() {
      if (this.onTable && this.canShowYear) {
        this.showYear = !this.showYear;
      }
      this.canShowYear = true;
    },
    goToWiki(url) {
      this.canShowYear = false;
      window.open(url);
    },
  },
  computed: {
    yearColor() {
      if (this.card.correct === false) return "error";
      return "success";
    },
    titleColor() {
      if (this.greyedOut) return "grey";
      if (this.card.mostRecent) return "alternative";
      if (this.onTable) return "secondary";
      return "primary";
    },
    imageOverlay() {
      if (this.greyedOut) {
        return "rgba(232, 232, 232, 0.5), rgba(232, 232, 232, 0.5)";
      }
      return undefined;
    },
  },
  filters: {
    truncate(string) {
      const maxLength = 40;
      if (string.length > maxLength) {
        return string.substring(0, maxLength) + "...";
      }
      return string;
    },
  },
};
</script>

<style scoped>
.card {
  cursor: pointer;
}
.desc {
  font-size: 12px;
}
.no-wrap {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.white-bg {
  background: #fff;
}
.hide {
  visibility: hidden !important;
}
.relative {
  position: relative;
}
.wiki {
  position: absolute;
  top: 3px;
  left: 3px;
}
</style>
