<template>
  <v-container fluid fill-height>
    <v-row align="center" class="d-flex flex-column">
      <h1 class="text-md-h1 text-h2 onyx--text">Chronoline</h1>
      <h3 class="text-subtitle text-center mt-5 onyx--text">
        The classic board game now playable online with friends!
      </h3>
    </v-row>
    <v-row align="center">
      <v-img
        src="@/assets/banner.png"
        contain
        height="20rem"
        class="pa-0 ma-0"
      ></v-img>
    </v-row>
    <v-row align="center" class="d-flex flex-column">
      <h4 class="text-body-1 text-center onyx--text">
        Create a room and share the link with your friends to start playing
        Chronoline
      </h4>
      <v-btn
        class="mt-10 mb-3"
        x-large
        rounded
        color="primary"
        @click.native="goToStart"
        ref="startBtn"
      >
        Play Now
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Home",
  methods: {
    goToStart() {
      this.$router.push({ name: "StartGame" });
    },
  },
};
</script>
