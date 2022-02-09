<template>
  <v-sheet color="transparent" class="mr-5 mt-5">
    <v-row justify="center" class="mb-1">
      <v-btn icon x-large @click.native="show = !show" ref="showBtn">
        <v-icon color="secondary">
          {{ show ? "mdi-eye-off" : "mdi-eye" }}
        </v-icon>
      </v-btn>
    </v-row>
    <v-expand-transition mode="out-in">
      <div v-if="show">
        <hr />
        <v-row justify="center">
          <v-col class="pb-0 mt-2">
            <p class="text-overline text-center pa-0">Name</p>
          </v-col>
          <v-col class="pb-0 mt-2">
            <p class="text-overline text-center pa-0">Cards</p>
          </v-col>
        </v-row>
        <v-list ref="playerList" color="transparent" dense>
          <v-list-item>
            <v-list-item-title class="text-body-2">
              CrazyFrogLover
            </v-list-item-title>
            <v-list-item-action class="text-body-2 ml-15">2</v-list-item-action>
          </v-list-item>
          <v-list-item>
            <v-list-item-title class="text-body-2">Rory</v-list-item-title>
            <v-list-item-action class="text-body-2 ml-15">4</v-list-item-action>
          </v-list-item>
          <v-list-item>
            <v-list-item-title class="text-body-2">
              Gary Chess
            </v-list-item-title>
            <v-list-item-action class="text-body-2 ml-15">6</v-list-item-action>
          </v-list-item>
        </v-list>
      </div>
    </v-expand-transition>
  </v-sheet>
</template>

<script>
export default {
  name: "TheScoreboard",
  data() {
    return {
      show: true,
    };
  },
};
</script>

<style></style>
