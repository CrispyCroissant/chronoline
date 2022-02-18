<template>
  <div>
    <v-row justify="center">
      <p class="text-caption">Look at other players</p>
    </v-row>
    <v-row class="d-flex flex-column align-center">
      <v-btn-toggle
        class="d-flex flex-column"
        style="width: 10rem"
        mandatory
        dense
        shaped
        borderless
      >
        <v-btn
          :color="color(player.nickname)"
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
    </v-row>
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
        return "info";
      }
      return "secondary";
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
