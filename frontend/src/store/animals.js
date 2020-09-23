import axios from 'axios';

const animals = {
  actions: {
    // ANIMALS
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
    async updateAnimalById(store, { animalId, animal }) {
      const request = await axios.put(`/api/animals/${animalId}`, animal);
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
  },
};

export default animals;
