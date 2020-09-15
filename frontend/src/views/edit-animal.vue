<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'EditAnimal',
  async created() {
    const animal = await this.fetchAnimalById(this.$route.query.animalId);
    this.name = animal.name;
    this.city = animal.city;
    this.type = animal.type;
  },
  data() {
    return {
      name: '',
      city: '',
      type: ''
    };
  },
  methods: {
    ...mapActions(['fetchAnimalById', 'updateAnimalById']),
    async updateAnimal(event) {
      event.preventDefault();
      const updatedAnimal = {
        name: this.name,
        city: this.city,
        type: this.type
      };
      await this.updateAnimalById({ animalId: this.$route.query.animalId, animal: updatedAnimal });
      this.$router.push('/account');
    }
  },
  computed: {
    ...mapState(['account'])
  }
};
</script>

<template lang="pug">
  section
    h1 Update information
    form(@submit='updateAnimal')
      label(for='name') Name: 
      input(id='name' type='text' v-model='name' required)
      br
      label(for='city') City: 
      input(id='city' type='text' v-model='city' required)
      br
      input(type='radio' id='dog' name='type' value='Dog' v-model='type' required)
      label(for='dog') Dog
      input(type='radio' id='cat' name='type' value='Cat' v-model='type')
      label(for='cat') Cat
      input(type='radio' id='others' name='type' value='Others' v-model='type')
      label(for='others') Others
      br
      button(type='submit') Edit 
</template>
