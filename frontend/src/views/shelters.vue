<script>
import ShelterCard from '@/components/shelter-card.vue';
import { mapActions } from 'vuex';

export default {
  name: 'Shelters',
  components: { ShelterCard },
  data() {
    return {
      shelters: [],
      cityList: [],
      selectedCity: 'All',
    };
  },
  async created() {
    this.shelters = await this.fetchShelters();
    this.cityList = this.shelters.reduce(
      (list, currentShelter) => {
        if (!list || !list.includes(currentShelter.city)) {
          list.push(currentShelter.city);
        }
        return list;
      },
      ['All']
    );
  },
  methods: {
    ...mapActions(['fetchShelters', 'fetchSheltersBy']),
    async filterShelters() {
      this.shelters = await this.fetchSheltersBy(this.query);
    },
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
  .home
    h1 Shelters
    section
      label(for='city-select') Cities:
      select(name='city' id='city-select' v-model='selectedCity' @change='filterShelters()')
        option(v-for='city in cityList' :value='city') {{ city }}
    ul(v-if='shelters.length > 0')
      ShelterCard(v-for='shelter in shelters' :shelter='shelter')
    p(v-else) No shelters
</template>
