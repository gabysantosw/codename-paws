import axios from 'axios';

const shelters = {
  actions: {
    // SHELTERS
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
    async fetchShelterPosts(store, shelterId) {
      const request = await axios.get(`/api/shelters/${shelterId}/posts`);
      return request.data;
    },
    async updateShelterById(store, { shelterId, shelter }) {
      const request = await axios.put(`/api/shelters/${shelterId}`, shelter);
      return request.data;
    },
    async deleteShelterById(store, shelterId) {
      const request = await axios.delete(`/api/shelters/${shelterId}`);
      return request.data;
    },
  },
};

export default shelters;
