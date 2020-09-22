import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;
axios.defaults.withCredentials = true;

import shelters from './shelters.js';
import animals from './animals.js';
import posts from './posts.js';

Vue.use(Vuex);

const SET_ACCOUNT = 'set account';

const store = new Vuex.Store({
  state: {
    account: null,
  },
  mutations: {
    [SET_ACCOUNT](state, account) {
      state.account = account;
    },
  },
  actions: {
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
    },
  },
  modules: {
    shelters,
    animals,
    posts,
  },
});

export default async () => {
  await store.dispatch('fetchSession');
  return store;
};
