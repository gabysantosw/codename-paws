<script>
import ShelterCard from '@/components/shelter-card.vue';
import { mapActions } from 'vuex';

export default {
  name: 'Shelters',
  components: { ShelterCard },
  data() {
    return {
      users: []
    };
  },
  async created() {
    this.users = await this.fetchShelters();
  },
  methods: {
    ...mapActions(['fetchShelters'])
  }
};
</script>

<template lang="pug">
  .home
    h1 All shelters, associations or individuals
    ul(v-if='users.length > 0')
      ShelterCard(v-for='user in users' :user='user')
    p(v-else) No shelters
</template>
