<script>
import { mapActions } from 'vuex';

export default {
  name: 'Register',
  data() {
    return {
      name: '',
      city: '',
      email: '',
      password: '',
      backendError: null,
    };
  },
  methods: {
    ...mapActions(['register']),
    async submitRegister(event) {
      event.preventDefault();

      try {
        await this.register({
          name: this.name,
          city: this.city,
          email: this.email,
          password: this.password,
        });

        this.$router.push('/login');
      } catch (error) {
        this.backendError = error.response.data.message;
      }
    },
  },
};
</script>

<template lang="pug">
  section 
    form(@submit='submitRegister')
      h1 Register 
      label(for='name') Name: 
      input(id='name' type='text' v-model='name' required)
      br
      label(for='city') City: 
      input(id='city' type='text' v-model='city' required)
      br
      label(for='email') Email: 
      input(id='email' type='email' v-model='email' required)
      br
      label(for='password') Password: 
      input(id='password' type='password' v-model='password' required)
      br
      button(type='submit') Create account
    p {{ backendError }}
    p Already have an account?
      router-link(to='/login') Login
</template>
