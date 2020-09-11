<script>
import AnimalCard from '@/components/animal-card.vue';
import { mapActions } from 'vuex';

export default {
  name: 'DetailedShelter',
  components: { AnimalCard },
  data() {
    return {
      shelter: null
    };
  },
  async mounted() {
    this.shelter = await this.fetchShelterById(this.$route.params.id);
  },
  methods: {
    ...mapActions(['fetchShelterById'])
  }
};
</script>

<template lang="pug">
  li(v-if='shelter') 
    h2 {{ shelter.name }}
    p Location: {{ shelter.city }}. 
    h3(v-if='shelter.animals.length > 0') Animals in care ({{ shelter.animals.length }})
    ul(v-if='shelter.animals.length > 0')
      AnimalCard(v-for='animal in shelter.animals' :animal='animal')
    h3 Latest Updates
    ul(v-if='user.posts.length > 0')
      li(v-for='post in user.posts') {{ post. title }}
</template>

<style lang="scss"></style>
