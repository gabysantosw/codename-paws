/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
// const request = require('supertest');
const supertest = require('supertest');
const app = require('../src/app');

// routes/index.js
describe('Animals endpoints', () => {
  const testUser = { name: 'Coyote', city: 'Pawnee' };
  const testAnimal = { name: 'Lil', type: 'Dog' };
  // const testPost = { title: 'Hiii' };

  it('GET  request to /animals should list at least one animal', async () => {
    const user = (await supertest(app).post('/api/users').send(testUser)).body;
    await supertest(app).post(`/api/users/${user._id}/animals`).send(testAnimal);
    const response = await supertest(app).get('/api/animals');
    expect(response.body.length > 0).toBe(true);
  });

  it('GET  request to /animals with a city query should list at least one animal', async () => {
    const user = (await supertest(app).post('/api/users').send(testUser)).body;
    const animal = (await supertest(app).post(`/api/users/${user._id}/animals`).send(testAnimal)).body;
    const response = await supertest(app).get(`/api/animals?city=${animal.city}`);
    expect(response.body.length > 0).toBe(true);
  });

  it('GET  request to /animals with a type query should list at least one animal', async () => {
    const user = (await supertest(app).post('/api/users').send(testUser)).body;
    const animal = (await supertest(app).post(`/api/users/${user._id}/animals`).send(testAnimal)).body;
    const response = await supertest(app).get(`/api/animals?type=${animal.type}`);
    expect(response.body.length > 0).toBe(true);
  });

  it('DELETE request to /animals/:animalId should remove the animal', async () => {
    const addedUser = (await supertest(app).post('/api/users').send(testUser)).body;
    // adding animal to user above
    const animalToDelete = (await supertest(app).post(`/api/users/${addedUser._id}/animals`).send(testAnimal)).body;

    await supertest(app).delete(`/api/animals/${animalToDelete._id}`);
    expect(addedUser.animals.length).toBe(0);
  });

  it('DELETE request to /users/:animalId with a non-existent user should return 404', async () => {
    const response = await supertest(app).delete(`/api/animals/303030303030303030303030`);
    expect(response.statusCode).toBe(404);
  });
});
