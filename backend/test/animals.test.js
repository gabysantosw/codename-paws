/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
// const request = require('supertest');
const supertest = require('supertest');
const app = require('../src/app');

// routes/index.js
describe('Animals endpoints', () => {
  const testShelter = { name: 'Coyote', city: 'Pawnee' };
  const testAnimal = { name: 'Lil', type: 'Dog' };
  // const testPost = { title: 'Hiii' };

  it('GET  request to /animals should list at least one animal', async () => {
    const shelter = (await supertest(app).post('/api/shelters').send(testShelter)).body;
    await supertest(app).post(`/api/shelters/${shelter._id}/animals`).send(testAnimal);
    const response = await supertest(app).get('/api/animals');
    expect(response.body.length > 0).toBe(true);
  });

  it('GET  request to /animals with a city query should list at least one animal', async () => {
    const shelter = (await supertest(app).post('/api/shelters').send(testShelter)).body;
    const animal = (await supertest(app).post(`/api/shelters/${shelter._id}/animals`).send(testAnimal)).body;
    const response = await supertest(app).get(`/api/animals?city=${animal.city}`);
    expect(response.body.length > 0).toBe(true);
  });

  it('GET  request to /animals with a type query should list at least one animal', async () => {
    const shelter = (await supertest(app).post('/api/shelters').send(testShelter)).body;
    const animal = (await supertest(app).post(`/api/shelters/${shelter._id}/animals`).send(testAnimal)).body;
    const response = await supertest(app).get(`/api/animals?type=${animal.type}`);
    expect(response.body.length > 0).toBe(true);
  });

  it('GET  request to /animals/:animalId should return an animal', async () => {
    const shelter = (await supertest(app).post('/api/shelters').send(testShelter)).body;
    const animal = (await supertest(app).post(`/api/shelters/${shelter._id}/animals`).send(testAnimal)).body;
    const response = await supertest(app).get(`/api/animals/${animal._id}`);

    expect(response.body.name).toBe(testAnimal.name);
    expect(response.body.type).toBe(testAnimal.type);
  });

  it('GET  request to /animals/:animalId with a non-existent animal should return 404', async () => {
    const response = await supertest(app).get(`/api/animals/303030303030303030303030`);
    expect(response.statusCode).toBe(404);
  });

  it('DELETE request to /animals/:animalId should remove the animal', async () => {
    const addedShelter = (await supertest(app).post('/api/shelters').send(testShelter)).body;
    // adding animal to shelter above
    const animalToDelete = (await supertest(app).post(`/api/shelters/${addedShelter._id}/animals`).send(testAnimal))
      .body;

    await supertest(app).delete(`/api/animals/${animalToDelete._id}`);
    expect(addedShelter.animals.length).toBe(0);
  });

  it('DELETE request to /shelters/:animalId with a non-existent shelter should return 404', async () => {
    const response = await supertest(app).delete(`/api/animals/303030303030303030303030`);
    expect(response.statusCode).toBe(404);
  });
});
