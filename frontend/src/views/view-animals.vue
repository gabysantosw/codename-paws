<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'ViewAnimals',
  data() {
    return {
      animals: []
    };
  },
  async created() {
    this.animals = await this.fetchShelterAnimals(this.account._id);
  },
  methods: {
    ...mapActions(['fetchShelterAnimals', 'deleteAnimalById']),
    async deleteAnimal(id) {
      await this.deleteAnimalById(id);
      this.animals = await this.fetchShelterAnimals(this.account._id);
    }
  },
  computed: {
    ...mapState(['account'])
  }
};
</script>

<template lang="pug">
  main
    h1 All animals
    router-link(to='/account/add-animal') Add animal
    ul 
      li(v-for='animal of animals') 
        span {{ animal.name }}
        button(@click='deleteAnimal(animal._id)') Remove
</template>
