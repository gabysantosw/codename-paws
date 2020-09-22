<script>
import { mapActions } from 'vuex';

export default {
  name: 'DetailedAnimal',
  data() {
    return {
      animal: null,
    };
  },
  async mounted() {
    this.animal = await this.fetchAnimalById(this.$route.params.id);
  },
  methods: {
    ...mapActions(['fetchAnimalById']),
  },
};
</script>

<template lang="pug">
  li(v-if='animal') 
    h2 {{ animal.name }}
    p Location: {{ animal.city }}. Type: {{ animal.type }}
</template>
