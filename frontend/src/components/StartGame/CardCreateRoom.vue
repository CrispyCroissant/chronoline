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
        <v-expand-transition>
          <div v-if="loading">
            <v-progress-linear
              class="mb-5"
              color="secondary"
              indeterminate
            ></v-progress-linear>
          </div>
        </v-expand-transition>
        <v-alert
          v-if="$socket.disconnected"
          ref="alert"
          type="error"
          class="mb-10"
        >
          Couldn't connect to Chronoline servers. Try again later.
        </v-alert>
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
              :disabled="$socket.disconnected"
            ></v-text-field>
          </v-form>
        </v-row>
        <v-row justify="center" class="mt-10">
          <v-btn
            x-large
            color="primary"
            @click.native.prevent="goToRoom"
            ref="createRoomBtn"
            :disabled="$socket.disconnected"
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
      error: false,
      loading: false,
    };
  },
  methods: {
    goToRoom() {
      this.loading = true;

      if (this.formValid && this.$socket.connected) {
        const roomId = Math.random().toString(36).slice(8);

        this.$socket.client.emit("createRoom", {
          id: roomId,
          nickname: this.nickname,
        });

        this.$router.push({ name: "PlayGame", params: { id: roomId } });
      }

      this.loading = false;
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
