<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'ViewPosts',
  data() {
    return {
      posts: []
    };
  },
  async created() {
    this.posts = await this.fetchShelterPosts(this.account._id);
  },
  methods: {
    ...mapActions(['fetchShelterPosts', 'deletePostById']),
    async deletePost(id) {
      await this.deletePostById(id);
      this.posts = await this.fetchShelterPosts(this.account._id);
    }
  },
  computed: {
    ...mapState(['account'])
  }
};
</script>

<template lang="pug">
  main
    h1 All posts
    router-link(to='/account/add-post') Create new post
    ul 
      li(v-for='post of posts') 
        span {{ post.title }}
        button(@click='deletePost(post._id)') Remove
</template>
