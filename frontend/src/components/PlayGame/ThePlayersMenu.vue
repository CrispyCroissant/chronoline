<template>
  <div>
    <p class="text-caption text-center mr-2">Look at other players</p>
    <v-btn-toggle class="d-flex flex-column" mandatory dense shaped borderless>
      <v-btn
        :color="color(player.nickname)"
        max-width="10rem"
        height="2rem"
        v-for="player in players"
        :key="player.nickname"
        @click="changePlayer(player.nickname)"
      >
        {{
          player.nickname === $store.state.nickname ? "You" : player.nickname
        }}
      </v-btn>
    </v-btn-toggle>
  </div>
</template>

<script>
export default {
  name: "ThePlayersMenu",
  methods: {
    // TODO: Write tests for these methods
    changePlayer(playerName) {
      this.$emit("changePlayer", playerName);
    },
    color(name) {
      if (name === this.$store.state.nickname) {
        return "success darken-1";
      }
      return "orange lighten-1";
    },
  },
  computed: {
    // TODO: Write tests for this
    players() {
      // Sort so player's own name is first.
      const players = [
        ...this.$store.state.players.filter(
          (player) => player.nickname === this.$store.state.nickname
        ),
        ...this.$store.state.players.filter(
          (player) => player.nickname !== this.$store.state.nickname
        ),
      ];

      return players;
    },
  },
};
</script>

<style></style>
