<template>
  <v-sheet class="pa-10" color="transparent" width="100%">
    <hr />
    <v-row class="my-7">
      <PlayingCard class="mx-2" />
      <PlayingCard class="mx-2" />
      <PlayingCard class="mx-2" />
      <PlayingCard class="mx-2" />
      <PlayingCard class="mx-2" />
    </v-row>
    <hr />
  </v-sheet>
</template>

<script>
import PlayingCard from "./PlayingCard.vue";

export default {
  components: { PlayingCard },
  name: "TheTable",
};
</script>

<style></style>
