<template>
  <v-row class="d-flex flex-column">
    <v-row justify="center" class="d-flex flex-column my-5">
      <h1 class="text-md-h1 text-h2 text-center onyx--text">Chronoline</h1>
      <h3 class="text-subtitle text-center my-5 mx-md-0 mx-10 onyx--text">
        The classic board game now playable online with friends!
      </h3>
    </v-row>
    <v-row justify="center">
      <v-sheet elevation="4" class="pa-15 mb-15 mx-10" rounded="lg">
        <h2 class="text-md-h4 text-h5 mb-15">Create a room</h2>
        <v-row class="d-flex flex-column">
          <h3 class="text-body-1 mb-3">Enter your nickname</h3>
          <v-text-field outlined autofocus></v-text-field>
        </v-row>
        <v-row class="d-flex flex-column mb-15" align="center">
          <v-col class="d-flex justify-left px-0">
            <h3 class="text-body-1 mb-3">Best of?</h3>
          </v-col>
          <v-btn-toggle mandatory>
            <v-btn color="accent">One</v-btn>
            <v-btn color="accent">Two</v-btn>
            <v-btn color="accent">Three</v-btn>
          </v-btn-toggle>
        </v-row>
        <v-row justify="center" class="mt-16">
          <v-btn de x-large color="primary">Create room</v-btn>
        </v-row>
      </v-sheet>
    </v-row>
  </v-row>
</template>

<script>
export default {
  name: "CardCreateRoom",
};
</script>

<style></style>
