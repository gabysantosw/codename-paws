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
      // animal === FormData object
      const request = await axios.post(`/api/shelters/${animal.get('shelterId')}/animals`, animal, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return request.data;
    },
    async updateAnimalById(store, animal) {
      const request = await axios.put(`/api/animals/${animal.get('animalId')}`, animal, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
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
