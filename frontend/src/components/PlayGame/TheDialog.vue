<template>
  <v-dialog persistent v-model="dialog" max-width="20rem">
    <v-snackbar
      v-model="showSnackbar"
      timeout="1300"
      rounded="lg"
      centered
      class="mb-15"
      ref="snackbar"
    >
      Link Copied!
    </v-snackbar>

    <!-- TODO: Refactor all cards into their own components. -->

    <v-card v-if="!showLoadingDialog && isHost" ref="inviteDialog">
      <v-card-title class="text-h5 white--text accent d-flex justify-center">
        Invitation link
      </v-card-title>
      <v-card-text
        class="clickable mt-5 text-center d-flex align-center justify-center"
        @click="copyToClipBoard()"
        ref="invitationLink"
      >
        <v-icon class="mr-1">mdi-link</v-icon>
        {{ currentURL }}
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="d-flex justify-center">
        <v-btn color="primary" text @click.native="attemptClose" ref="closeBtn">
          Close
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-card
      v-if="!isHost"
      @keydown.enter.prevent="joinRoom"
      ref="nicknameDialog"
    >
      <v-card-title class="text-h5 white--text accent d-flex justify-center">
        Before you play...
      </v-card-title>
      <v-card-text
        class="mt-10 text-center d-flex flex-column align-center justify-center"
      >
        <p class="text-body-1">Enter a nickname</p>
        <v-form>
          <v-text-field
            autofocus
            v-model="nickname"
            :rules="[required]"
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

    <v-expand-transition>
      <v-card v-if="showLoadingDialog && loading" ref="loadDialog">
        <v-card-title class="text-h5 white--text accent d-flex justify-center">
          Waiting for players
        </v-card-title>
        <v-card-text
          class="clickable mt-5 d-flex flex-column align-center justify-center"
          @click="copyToClipBoard()"
        >
          <div>
            <v-icon class="mr-1">mdi-link</v-icon>
            {{ currentURL }}
          </div>
          <v-progress-circular
            indeterminate
            color="primary"
            class="mt-5"
          ></v-progress-circular>
          <!-- TODO: Remove this after these pages are fully implemented -->
          <v-btn class="mt-5" @click="dialog = false">DEBUG: Close</v-btn>
        </v-card-text>
      </v-card>
    </v-expand-transition>
  </v-dialog>
</template>

<script>
export default {
  name: "TheDialog",
  data() {
    return {
      dialog: true,
      loading: true,
      showLoadingDialog: false,
      showSnackbar: false,
      isHost: false,
      formValid: false,
    };
  },
  methods: {
    attemptClose() {
      if (!this.loading) {
        this.dialog = false;
      } else {
        this.showLoadingDialog = true;
      }
    },
    copyToClipBoard() {
      this.showSnackbar = true;
      navigator.clipboard.writeText(this.currentURL);
    },
    joinRoom() {
      if (this.formValid) {
        const nickname = this.$store.state.nickname;
        const roomId = this.$route.params.id;

        this.$socket.client.emit("joinRoom", { nickname, id: roomId });
        this.showLoadingDialog = true;
        // Just used to hide nickname card. User is not actaully host.
        this.isHost = true;
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
    currentURL() {
      return process.env.VUE_APP_URL + this.$route.path;
    },
    nickname: {
      get() {
        return this.$store.state.nickname;
      },
      set(nickname) {
        this.$store.commit("setNickname", nickname);
      },
    },
  },
  mounted() {
    if (this.$store.state.nickname) {
      this.isHost = true;
    }
  },
};
</script>

<style scoped>
.clickable {
  cursor: pointer;
}
</style>
