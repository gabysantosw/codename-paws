<script>
import { mapActions } from 'vuex';

export default {
  name: 'DetailedAnimal',
  data() {
    return {
      post: null,
    };
  },
  async mounted() {
    this.post = await this.fetchPostById(this.$route.params.id);
  },
  methods: {
    ...mapActions(['fetchPostById']),
  },
};
</script>

<template lang="pug">
  li(v-if='post') 
    h2 {{ post.title }}
    p this is a post
</template>
