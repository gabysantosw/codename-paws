import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;
axios.defaults.withCredentials = true;

Vue.use(Vuex);

const SET_ACCOUNT = 'set account';

const store = new Vuex.Store({
  state: {
    account: null
  },
  mutations: {
    [SET_ACCOUNT](state, account) {
      state.account = account;
    }
  },
  actions: {
    async fetchShelters() {
      const request = await axios.get('/api/shelters');
      return request.data;
    },
    async fetchSheltersBy(store, query) {
      const request = await axios.get(`/api/shelters`, { params: query });
      return request.data;
    },
    async fetchShelterById(store, shelterId) {
      const request = await axios.get(`/api/shelters/${shelterId}`);
      return request.data;
    },
    async fetchShelterAnimals(store, shelterId) {
      const request = await axios.get(`/api/shelters/${shelterId}/animals`);
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
    },
    async postAnimal(store, animal) {
      const request = await axios.post(`/api/shelters/${animal.shelterId}/animals`, animal);
      return request.data;
    },
    async deleteAnimalById(store, animalId) {
      const request = await axios.delete(`/api/animals/${animalId}`);
      return request.data;
    },
    async fetchPostById(store, postId) {
      const request = await axios.get(`/api/posts/${postId}`);
      return request.data;
    },
    async postPost(store, post) {
      const request = await axios.post(`/api/shelters/${post.shelterId}/posts`, post);
      return request.data;
    },
    // AUTHENTICATION
    async fetchSession({ commit }) {
      const account = await axios.get('/api/account/session');
      commit(SET_ACCOUNT, account.data || null);
    },
    async login({ commit }, credentials) {
      const account = await axios.post('/api/account/session', credentials);
      commit(SET_ACCOUNT, account.data);
    },
    async register(store, account) {
      return axios.post('/api/account', account);
    },
    async logout({ commit }) {
      await axios.delete('/api/account/session');
      commit(SET_ACCOUNT, null);
    }
  },
  modules: {}
});

export default async () => {
  await store.dispatch('fetchSession');
  return store;
};
