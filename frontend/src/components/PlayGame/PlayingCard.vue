<template>
  <v-sheet
    elevation="5"
    class="card"
    rounded="lg"
    max-width="10rem"
    draggable="true"
    @click="showYear = !showYear"
  >
    <v-sheet color="primary" rounded="lg b-0">
      <p class="text-body-2 text-center white--text ma-0 pa-3">
        George Washington
      </p>
    </v-sheet>
    <v-row justify="center" class="my-2">
      <v-col cols="12" class="ma-0 pa-0">
        <p class="text-caption text-center text-wrap ma-0 pa-2 onyx--text">
          born
        </p>
      </v-col>
      <v-col cols="12" class="d-flex justify-center pa-0">
        <v-img
          src="https://upload.wikimedia.org/wikipedia/commons/b/b6/Gilbert_Stuart_Williamstown_Portrait_of_George_Washington.jpg"
          max-height="110px"
          max-width="100px"
          class="mb-3 rounded-lg"
        />
      </v-col>
    </v-row>
    <v-expand-transition>
      <v-sheet v-if="!showYear" color="grey lighten-3" rounded="lg t-0">
        <p class="text-caption text-center text-wrap ma-0 pa-2 onyx--text">
          American President
        </p>
      </v-sheet>
    </v-expand-transition>
    <v-expand-transition>
      <v-sheet v-if="showYear" color="success" rounded="lg t-0">
        <p class="text-caption text-center text-wrap ma-0 pa-2 white--text">
          1732
        </p>
      </v-sheet>
    </v-expand-transition>
  </v-sheet>
</template>

<script>
export default {
  name: "PlayingCard",
  data() {
    return {
      showYear: false,
    };
  },
};
</script>

<style scoped>
.card {
  cursor: pointer;
}
</style>
