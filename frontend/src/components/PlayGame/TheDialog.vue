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

    <v-card v-if="!showLoadingDialog" ref="inviteDialog">
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
  },
  computed: {
    currentURL() {
      return process.env.VUE_APP_URL + this.$route.path;
    },
  },
};
</script>

<style scoped>
.clickable {
  cursor: pointer;
}
</style>
