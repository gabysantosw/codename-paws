<script>
import { mapState, mapActions } from 'vuex';
import DeleteConfirmation from '@/components/delete-confirmation.vue';

export default {
  name: 'Account',
  components: {
    DeleteConfirmation,
  },
  async created() {
    this.shelter = await this.fetchShelterById(this.account._id);
  },
  data() {
    return {
      shelter: null,
      isAlertOpen: false,
    };
  },
  methods: {
    ...mapActions(['fetchShelterById']),
    openAlert() {
      this.isAlertOpen = true;
    },
    closeAlert() {
      this.isAlertOpen = false;
      this.$nextTick(() => this.$refs.openButton.focus());
    },
  },
  computed: {
    ...mapState(['account']),
  },
};
</script>

<template lang="pug">
  section(v-if='shelter')
    h1 Account information
    p {{ shelter.name }} - {{ shelter.city }}
    router-link(to='/account/edit-shelter') Edit information
    button(v-if='!isAlertOpen' @click='openAlert' ref='openButton') Delete account
    DeleteConfirmation(:shelterId='account._id' :isAlertOpen='isAlertOpen' @close='closeAlert()')
    h2 Animals in care ({{ shelter.animals.length }})
    router-link(to='/account/add-animal') Add animal
    router-link(v-if='shelter.animals.length' to='/account/view-animals') View all
    ul 
      li(v-for='animal of shelter.animals') {{ animal.name }}
    h2 Posts ({{ shelter.posts.length }})
    router-link(to='/account/add-post') Create new post
    router-link(v-if='shelter.posts.length' to='/account/view-posts') View all
    ul 
      li(v-for='post of shelter.posts') {{ post.title }}
</template>
