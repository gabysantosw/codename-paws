<template lang="pug">
  .home
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    ul 
      li(v-for='user in users') {{ user.name }}
        ul
          li(v-for='animal in user.animals') {{animal.name}} {{animal.city}} {{animal.type}}
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/hello-world.vue';
import axios from 'axios';

export default {
  name: 'Home',
  components: { HelloWorld },
  data() {
    return {
      users: []
    };
  },
  async created() {
    const request = await axios.get('/api/users');
    this.users = request.data;
    console.log(this.users);
  }
};
</script>
