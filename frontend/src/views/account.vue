<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Account',
  async created() {
    this.shelter = await this.fetchShelterById(this.account._id);
  },
  data() {
    return {
      shelter: null
    };
  },
  methods: {
    ...mapActions(['fetchShelterById'])
  },
  computed: {
    ...mapState(['account'])
  }
};
</script>

<template lang="pug">
  section(v-if='shelter')
    h1 Account information
    p {{ shelter.name }}
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
