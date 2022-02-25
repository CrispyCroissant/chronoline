<template>
  <v-container fluid fill-height>
    <CardCreateRoom />
  </v-container>
</template>

<script>
import CardCreateRoom from "../components/StartGame/CardCreateRoom.vue";
export default {
  components: { CardCreateRoom },
  name: "StartGame",
  metaInfo: {
    titleTemplate: "%s | Create room",
  },
};
</script>

<style></style>
