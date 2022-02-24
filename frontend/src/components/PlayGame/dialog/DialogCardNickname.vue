<template>
  <v-card v-if="show" @keydown.enter.prevent="joinRoom" ref="nicknameDialog">
    <v-card-title class="text-h5 white--text primary d-flex justify-center">
      Before you play...
    </v-card-title>
    <v-card-text
      class="mt-10 text-center d-flex flex-column align-center justify-center"
    >
      <p class="text-body-1">Enter a nickname</p>
      <v-form ref="form">
        <v-text-field
          autofocus
          v-model="nickname"
          :rules="[required, nameNotTaken]"
          outlined
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions class="d-flex justify-center">
      <v-btn color="primary" text @click.native="joinRoom" ref="playBtn">
        Play
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "DialogCardNickname",
  props: ["show"],
  data() {
    return {
      formValid: false,
      takenNames: [],
    };
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
  methods: {
    joinRoom() {
      if (this.formValid) {
        const nickname = this.$store.state.nickname;
        const roomId = this.$route.params.id;

        this.$socket.client.emit("joinRoom", { nickname, id: roomId });
        this.$emit("roomJoined");
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
    nameNotTaken(value) {
      if (this.takenNames.includes(value)) {
        return `${value} is already taken!`;
      } else {
        this.formValid = true;
        return true;
      }
    },
  },
  sockets: {
    nameTaken(data) {
      this.takenNames.push(data.name);
    },
  },
};
</script>

<style></style>
