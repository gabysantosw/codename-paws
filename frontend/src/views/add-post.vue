<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'AddPost',
  data() {
    return {
      title: '',
      backendError: null
    };
  },
  methods: {
    ...mapActions(['postPost']),
    async addPost(event) {
      event.preventDefault();

      try {
        const post = {
          title: this.title,
          shelterId: this.account._id
        };
        await this.postPost(post);

        this.$router.push('/account');
      } catch (error) {
        this.backendError = error.response.data.message;
      }
    }
  },
  computed: {
    ...mapState(['account'])
  }
};
</script>

<template lang="pug">
  section
    h1 Create new post
    form(@submit='addPost')
      label(for='title') Title: 
      input(id='title' type='text' v-model='title' required)
      br
      button(type='submit') Create
</template>
