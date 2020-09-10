<script>
import ShelterCard from '@/components/shelter-card.vue';
import { mapActions } from 'vuex';

export default {
  name: 'Shelters',
  components: { ShelterCard },
  data() {
    return {
      shelters: []
    };
  },
  async created() {
    this.shelters = await this.fetchShelters();
  },
  methods: {
    ...mapActions(['fetchShelters'])
  }
};
</script>

<template lang="pug">
  .home
    h1 Shelters
    ul(v-if='shelters.length > 0')
      ShelterCard(v-for='shelter in shelters' :shelter='shelter')
    p(v-else) No shelters
</template>
