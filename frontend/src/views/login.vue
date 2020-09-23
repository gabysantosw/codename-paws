<script>
import { mapActions } from 'vuex';

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      backendError: null,
    };
  },
  methods: {
    ...mapActions(['login']),
    async submitLogin(event) {
      event.preventDefault();

      try {
        await this.login({
          email: this.email,
          password: this.password,
        });
        this.$router.push('/');
      } catch (error) {
        this.backendError = error.response.data.message;
      }
    },
  },
};
</script>

<template lang="pug">
  section
    form(@submit='submitLogin')
      h1 Log into your account
      label(for='email') Email: 
      input(id='email' type='email' v-model='email' required)
      br
      label(for='password') Password: 
      input(id='password' type='password' v-model='password' required)
      br
      button(type='submit') Login
    p(v-if='backendError') {{ backendError }}
    p Don't have an account yet? 
      router-link(to='/register') Register
</template>
