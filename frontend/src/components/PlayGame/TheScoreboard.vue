<template>
  <v-sheet color="transparent" class="mr-5 mt-5">
    <h2 class="text-h3">Scoreboard</h2>
    <hr />
    <v-row justify="center">
      <v-col class="pb-0 mt-2">
        <p class="text-overline text-center pa-0">Name</p>
      </v-col>
      <v-col class="pb-0 mt-2">
        <p class="text-overline text-center pa-0">Cards left</p>
      </v-col>
    </v-row>
    <v-list color="transparent" dense>
      <v-list-item>
        <v-list-item-title class="text-body-2">BigEventGuy</v-list-item-title>
        <v-list-item-action class="text-body-2">2</v-list-item-action>
      </v-list-item>
      <v-list-item>
        <v-list-item-title class="text-body-2">Rory</v-list-item-title>
        <v-list-item-action class="text-body-2">4</v-list-item-action>
      </v-list-item>
      <v-list-item>
        <v-list-item-title class="text-body-2">Gary Chess</v-list-item-title>
        <v-list-item-action class="text-body-2">6</v-list-item-action>
      </v-list-item>
    </v-list>
  </v-sheet>
</template>

<script>
export default {};
</script>

<style></style>
