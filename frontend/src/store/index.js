import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;
axios.defaults.withCredentials = true;

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {
    async fetchUsers() {
      const request = await axios.get('/api/users');
      return request.data;
    },
    async fetchUserById(store, userId) {
      const request = await axios.get(`/api/users/${userId}`);
      return request.data;
    },
    async fetchAnimals() {
      const request = await axios.get('/api/animals');
      return request.data;
    },
    async fetchAnimalById(store, animalId) {
      const request = await axios.get(`/api/animals/${animalId}`);
      return request.data;
    }
  },
  modules: {}
});
