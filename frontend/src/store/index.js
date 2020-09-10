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
    async fetchShelters() {
      const request = await axios.get('/api/shelters');
      return request.data;
    },
    async fetchShelterById(store, shelterId) {
      const request = await axios.get(`/api/shelters/${shelterId}`);
      return request.data;
    },
    async fetchAnimals() {
      const request = await axios.get('/api/animals');
      return request.data;
    },
    async fetchAnimalsBy(store, query) {
      const request = await axios.get(`/api/animals`, { params: query });
      return request.data;
    },
    async fetchAnimalById(store, animalId) {
      const request = await axios.get(`/api/animals/${animalId}`);
      return request.data;
    }
  },
  modules: {}
});
