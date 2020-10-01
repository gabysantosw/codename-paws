<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'AddAnimal',
  created() {
    this.city = this.account.city;
  },
  data() {
    return {
      name: '',
      city: '',
      type: '',
      backendError: null,
    };
  },
  methods: {
    ...mapActions(['postAnimal']),
    async addAnimal(event) {
      event.preventDefault();

      try {
        const form = new FormData();
        form.append('shelterId', this.account._id);
        form.append('name', this.name);
        form.append('city', this.city);
        form.append('type', this.type);
        form.append('file', this.$refs.file.files[0]);

        await this.postAnimal(form);

        this.$router.push('/account');
      } catch (error) {
        this.backendError = error.response.data.message;
      }
    },
  },
  computed: {
    ...mapState(['account']),
  },
};
</script>

<template lang="pug">
  section
    h1 Add animal
    form(@submit='addAnimal')
      label(for='name') Name: 
      input(id='name' type='text' v-model='name' required)
      br
      label(for='city') City: 
      input(id='city' type='text' v-model='city' required)
      br
      label(for='image') Picture:
      input(id='image' ref='file' type='file' accept='.jpg, .jpeg, .png')
      br
      input(type='radio' id='dog' name='type' value='Dog' v-model='type' required)
      label(for='dog') Dog
      input(type='radio' id='cat' name='type' value='Cat' v-model='type')
      label(for='cat') Cat
      input(type='radio' id='others' name='type' value='Others' v-model='type')
      label(for='others') Others
      br
      button(type='submit') Add
</template>
