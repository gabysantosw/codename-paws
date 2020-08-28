<script>
import AnimalCard from '@/components/animal-card.vue';
import { mapActions } from 'vuex';

export default {
  name: 'DetailedShelter',
  components: { AnimalCard },
  data() {
    return {
      user: null
    };
  },
  async mounted() {
    this.user = await this.fetchUserById(this.$route.params.id);
  },
  methods: {
    ...mapActions(['fetchUserById'])
  }
};
</script>

<template lang="pug">
  li(v-if='user') 
    h2 {{ user.name }}
    p Location: {{ user.city }}. 
    h3(v-if='user.animals.length > 0') Animals in care ({{ user.animals.length }})
    ul(v-if='user.animals.length > 0')
      AnimalCard(v-for='animal in user.animals' :animal='animal')
    h3 Latest Updates
    ul(v-if='user.posts.length > 0')
      li(v-for='post in user.posts') {{ post. title }}
</template>

<style lang="scss"></style>
