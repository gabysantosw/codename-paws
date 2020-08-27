import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {
    async fetchUsers() {
      const request = await axios.get('/api/users');
      return request.data;
    },
    async fetchAnimals() {
      const request = await axios.get('/api/animals');
      return request.data;
    }
  },
  modules: {}
});
