<template lang="pug">
  .home
    h1 All shelters, associations or individuals
    ul(v-if='users.length > 0')
      ShelterCard(v-for='user in users' :user='user')
    p(v-else) No shelters
</template>

<script>
// @ is an alias to /src
import ShelterCard from '@/components/shelter-card.vue';
import axios from 'axios';

export default {
  name: 'Home',
  components: { ShelterCard },
  data() {
    return {
      users: []
    };
  },
  async created() {
    const request = await axios.get('/api/users');
    this.users = request.data;
  }
};
</script>
