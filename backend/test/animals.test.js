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
});
