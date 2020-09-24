<script>
import { mapActions } from 'vuex';

export default {
  name: 'ConfirmationModal',
  props: ['isModalOpen', 'shelterId'],
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
    isModalOpen(isTrue) {
      // focus should move to modal element
      if (isTrue) this.$nextTick(() => this.$refs.closeButton.focus());
    },
  },
};
</script>

<template lang="pug">
  //- ESC key should close modal
  .modal(v-if='isModalOpen' @keydown.esc='emitCloseDialog()' :aria-hidden="isModalOpen" role='dialog' aria-label='Confirm account deletion.' aria-modal='true' aria-describedby="dialog-description")
    button(@click='emitCloseDialog()' ref='closeButton' aria-label='Close dialog.') Close
    p#dialog-description Are you sure you want to permanently delete your account? This will remove all your posts and adoptable animals
    button(@click='deleteAccount()') Delete account
</template>
