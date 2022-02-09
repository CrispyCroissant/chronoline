<template>
  <v-sheet
    class="px-10 py-16"
    color="onyx"
    elevation="4"
    rounded="xl"
    width="98%"
  >
    <v-row>
      <PlayingCard class="mx-2" />
      <PlayingCard class="mx-2" />
      <PlayingCard class="mx-2" />
      <PlayingCard class="mx-2" />
      <PlayingCard class="mx-2" />
    </v-row>
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
