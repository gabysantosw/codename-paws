<template lang="pug">
  section
    h1 All animals looking to be adopted
    ul(v-if='animals.length > 0')
      AnimalCard(v-for='animal in animals' :animal='animal')
    p(v-else) No animals
</template>

<script>
import AnimalCard from '@/components/animal-card.vue';
import axios from 'axios';

export default {
  name: 'Home',
  components: { AnimalCard },
  data() {
    return {
      animals: []
    };
  },
  async created() {
    const request = await axios.get('/api/animals');
    this.animals = request.data;
  }
};
</script>
