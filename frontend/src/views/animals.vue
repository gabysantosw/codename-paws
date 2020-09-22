<script>
import AnimalCard from '@/components/animal-card.vue';
import { mapActions } from 'vuex';

export default {
  name: 'Animals',
  components: { AnimalCard },
  data() {
    return {
      animals: [],
      cityList: [],
      typeList: [],
      selectedCity: 'All',
      selectedType: 'All',
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
    this.typeList = this.animals.reduce(
      (list, currentAnimal) => {
        if (!list || !list.includes(currentAnimal.type)) {
          list.push(currentAnimal.type);
        }
        return list;
      },
      ['All']
    );
  },
  methods: {
    async filterAnimals() {
      this.animals = await this.fetchAnimalsBy(this.query);
    },
    ...mapActions(['fetchAnimals', 'fetchAnimalsBy']),
  },
  computed: {
    query() {
      const params = {};
      if (this.selectedCity !== 'All') params.city = this.selectedCity;
      if (this.selectedType !== 'All') params.type = this.selectedType;
      return params;
    },
  },
};
</script>

<template lang="pug">
  section
    h1 Animals looking to be adopted
    section
      label(for='city-select') Cities:
      select(name='city' id='city-select' v-model='selectedCity' @change='filterAnimals()')
        option(v-for='city in cityList' :value='city') {{ city }}
      p Type:
      template(v-for='type in typeList')
        input(type='radio' :id='type' name='type' :value='type' v-model='selectedType' @change='filterAnimals()')
        label(:for='type') {{ type }}
    ul(v-if='animals.length > 0')
      AnimalCard(v-for='animal in animals' :animal='animal')
    p(v-else) No animals
</template>
