<script>
import { mapActions } from 'vuex';

export default {
  name: 'Home',
  data() {
    return {
      cityList: [],
      selectedCity: 'All'
    };
  },
  async created() {
    this.animals = await this.fetchAnimals();
    this.cityList = this.animals.reduce(
      (list, currentAnimal) => {
        if (!list || !list.includes(currentAnimal.city)) {
          list.push(currentAnimal.city);
        }
        return list;
      },
      ['All']
    );
  },
  methods: {
    ...mapActions(['fetchAnimals'])
  }
};
</script>

<template lang="pug">
  section
    h1 Adopt animals or find shelters near you
    router-link(to='/animals') Check adoptable pets
    br
    router-link(to='/shelters') Show shelters
</template>
