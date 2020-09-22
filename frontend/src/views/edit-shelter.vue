<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'EditShelter',
  async created() {
    const shelter = await this.fetchShelterById(this.account._id);
    this.name = shelter.name;
    this.city = shelter.city;
  },
  data() {
    return {
      name: '',
      city: '',
    };
  },
  methods: {
    ...mapActions(['fetchShelterById', 'updateShelterById']),
    async updateShelter(event) {
      event.preventDefault();
      const updatedShelter = {
        name: this.name,
        city: this.city,
      };
      await this.updateShelterById({ shelterId: this.account._id, shelter: updatedShelter });
      this.$router.push('/account');
    },
  },
  computed: {
    ...mapState(['account']),
  },
};
</script>

<template lang="pug">
  section
    h1 Update information
    form(@submit='updateShelter')
      label(for='name') Name: 
      input(id='name' type='text' v-model='name' required)
      br
      label(for='city') City: 
      input(id='city' type='text' v-model='city' required)
      br
      button(type='submit') Edit 
</template>
