<script>
import { mapActions } from 'vuex';

export default {
  name: 'DeleteConfirmation',
  props: ['isAlertOpen', 'shelterId'],
  methods: {
    ...mapActions(['deleteShelterById', 'logout']),
    async deleteAccount() {
      await this.deleteShelterById(this.shelterId);
      await this.logout();
      this.$router.push('/');
    },
    emitCloseDialog() {
      this.$emit('close');
    },
  },
  watch: {
    isAlertOpen(isTrue) {
      // focus should move to alert element
      if (isTrue) this.$nextTick(() => this.$refs.closeButton.focus());
    },
  },
};
</script>

<template lang="pug">
  //- ESC key should close alert
  div(v-if='isAlertOpen' @keydown.esc='emitCloseDialog()' :aria-hidden="isAlertOpen")
    p#dialog-description Please confirm you want to permanently delete your account. This will remove all your posts and adoptable animals.
    button(@click='emitCloseDialog()' ref='closeButton' aria-label='Close dialog.') I want to keep my account
    button(@click='deleteAccount()') Yes, delete my account
</template>
