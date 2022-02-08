<template>
  <v-row class="d-flex flex-column" @keydown.enter.prevent="goToRoom">
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
          <v-form>
            <v-text-field
              outlined
              autofocus
              v-model="nickname"
              ref="nameInput"
              :rules="[required]"
            ></v-text-field>
          </v-form>
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
          <v-btn
            x-large
            color="primary"
            @click.native.prevent="goToRoom"
            ref="createRoomBtn"
          >
            Create room
          </v-btn>
        </v-row>
      </v-sheet>
    </v-row>
  </v-row>
</template>

<script>
export default {
  name: "CardCreateRoom",
  data() {
    return {
      formValid: false,
    };
  },
  methods: {
    goToRoom() {
      if (this.formValid) {
        const roomId = Math.random().toString(36).slice(8);
        this.$router.push({ name: "PlayGame", params: { id: roomId } });
      }
    },
    required(value) {
      if (value) {
        this.formValid = true;
        return !!value;
      } else {
        return "You need to provide a nickname.";
      }
    },
  },
  computed: {
    nickname: {
      get() {
        return this.$store.state.nickname;
      },
      set(nickname) {
        this.$store.commit("setNickname", nickname);
      },
    },
  },
};
</script>

<style></style>
