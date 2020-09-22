<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'EditPost',
  async created() {
    const post = await this.fetchPostById(this.$route.query.postId);
    console.log(post);
    this.title = post.title;
  },
  data() {
    return {
      title: '',
    };
  },
  methods: {
    ...mapActions(['fetchPostById', 'updatePostById']),
    async updateAnimal(event) {
      event.preventDefault();
      const updatedPost = {
        title: this.title,
      };
      await this.updatePostById({ postId: this.$route.query.postId, post: updatedPost });
      this.$router.push('/account');
    },
  },
  computed: {
    ...mapState(['account']),
  },
};
</script>

<template lang="pug">
  section
    h1 Update post
    form(@submit='updateAnimal')
      label(for='title') title: 
      input(id='title' type='text' v-model='title' required)
      br
      button(type='submit') Edit 
</template>
