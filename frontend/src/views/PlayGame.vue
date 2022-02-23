<template>
  <v-container fluid class="d-flex flex-column">
    <TheDialog />
    <v-row justify="space-between" align="center">
      <v-row justify="center">
        <ThePlayerTurnTitle />
      </v-row>
    </v-row>
    <v-row justify="center" align="center">
      <TheTable />
    </v-row>
    <v-row justify="center" align="end">
      <ThePlayerCardSheet />
    </v-row>
  </v-container>
</template>

<script>
import TheDialog from "../components/PlayGame/TheDialog.vue";
import ThePlayerCardSheet from "../components/PlayGame/ThePlayerCardSheet.vue";
import ThePlayerTurnTitle from "../components/PlayGame/ThePlayerTurnTitle.vue";
import TheTable from "../components/PlayGame/TheTable.vue";

export default {
  components: {
    ThePlayerCardSheet,
    TheDialog,
    TheTable,
    ThePlayerTurnTitle,
  },
  name: "PlayGame",
  beforeRouteEnter(_, from, next) {
    if (!(from.name === "StartGame")) {
      next((vm) => {
        vm.checkRoom();
      });
    } else {
      next();
    }
  },
  beforeRouteLeave(_, __, next) {
    this.$socket.client.emit("leaveRoom");
    next();
  },
  methods: {
    checkRoom() {
      const roomId = this.$route.params.id;

      this.$socket.client.emit("roomExists", { id: roomId });

      this.$socket.client.on("roomNotFound", () => {
        this.$router.push({ name: "RoomNotFound" });
      });
    },
  },
};
</script>

<style scoped>
.container {
  height: 100vh;
}
</style>
