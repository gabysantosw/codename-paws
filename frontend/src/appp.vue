<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'App',
  methods: {
    ...mapActions(['logout']),
    async doLogout() {
      await this.logout();
      this.$router.push('/');
    },
  },
  computed: {
    ...mapState(['account']),
  },
};
</script>

<template lang="pug">
  main
    nav 
      router-link(to="/") Home
      router-link(to="/shelters") Shelters
      router-link(to="/animals") Animals
      router-link(v-if='!account' to="/login") Login
      router-link(v-if='!account' to="/register") Register
      router-link(v-if='account' to='/account') Account
      button(v-if='account' @click='doLogout') Logout
    p(v-if='account') Logged in
    p(v-else) NOT logged in
    router-view
</template>

<style lang="scss">
@import '@/styles/main.scss';
</style>
