/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
const supertest = require('supertest');
const app = require('../src/app');

// routes/index.js
describe('Index', () => {
  it('GET request to / should give an OK status', async () => {
    const response = await supertest(app).get('/api/');
    expect(response.statusCode).toBe(200);
  });
});

// routes/shelters.js
describe('Shelters endpoints', () => {
  const testShelter = { name: 'Coyote', city: 'Pawnee' };
  const testAnimal = { name: 'Lil', type: 'Dog' };
  const testPost = { title: 'Hiii' };

  it('POST request to /shelters should create a shelter', async () => {
    const responseShelter = await supertest(app).post('/api/shelters').send(testShelter);
    expect(responseShelter.body.name).toBe(testShelter.name);
    expect(responseShelter.body.city).toBe(testShelter.city);
  });

  it('GET  request to /shelters should list at least one shelter', async () => {
    await supertest(app).post('/api/shelters').send(testShelter);
    const response = await supertest(app).get('/api/shelters');
    expect(response.body.length > 0).toBe(true);
  });

  it('GET  request to /shelters with a name query should list at least one shelter', async () => {
    await supertest(app).post('/api/shelters').send(testShelter);
    const response = await supertest(app).get(`/api/shelters?name=${testShelter.name}`);
    expect(response.body.length > 0).toBe(true);
  });

  it('GET  request to /shelters with a city query should list at least one shelter', async () => {
    await supertest(app).post('/api/shelters').send(testShelter);
    const response = await supertest(app).get(`/api/shelters?city=${testShelter.city}`);
    expect(response.body.length > 0).toBe(true);
  });

  it('GET request to /shelters/init should give an OK status', async () => {
    const response = await supertest(app).get('/api/shelters/init');
    expect(response.statusCode).toBe(200);
  });

  it('GET  request to /shelters/:shelterId should return an shelter', async () => {
    const addedShelter = (await supertest(app).post('/api/shelters').send(testShelter)).body;
    const response = await supertest(app).get(`/api/shelters/${addedShelter._id}`);

    expect(response.body.name).toBe(testShelter.name);
    expect(response.body.city).toBe(testShelter.city);
  });

  it('GET  request to /shelters/:shelterId with a non-existent shelter should return 404', async () => {
    const response = await supertest(app).get(`/api/shelters/303030303030303030303030`);
    expect(response.statusCode).toBe(404);
  });

  it('DELETE request to /shelters/:shelterId should remove the shelter', async () => {
    const shelterToDelete = { name: 'Ayyy', city: 'Delete' };
    const addedShelter = (await supertest(app).post('/api/shelters').send(shelterToDelete)).body;
    const response = await supertest(app).delete(`/api/shelters/${addedShelter._id}`);
    expect(response.statusCode).toBe(200);
  });

  it('DELETE request to /shelters/:shelterId with a non-existent shelter should return 404', async () => {
    const response = await supertest(app).delete(`/api/shelters/303030303030303030303030`);
    expect(response.statusCode).toBe(404);
  });

  // <--===---===--> ANIMAL <--===---===--> //

  it('GET  request to /shelters/:shelterId/animals should list at least one animal', async () => {
    const shelter = (await supertest(app).post('/api/shelters').send(testShelter)).body;
    await supertest(app).post(`/api/shelters/${shelter._id}/animals`).send(testAnimal);
    const response = await supertest(app).get(`/api/shelters/${shelter._id}/animals`);
    expect(response.body.length).toBe(1);
  });

  it('POST  request to /shelters/:shelterId/animals with an specific city, should match the given city', async () => {
    const testAnimalWithCity = { name: 'Choco', city: 'Caracas', type: 'Dog' };

    const shelter = (await supertest(app).post('/api/shelters').send(testShelter)).body;
    await supertest(app).post(`/api/shelters/${shelter._id}/animals`).send(testAnimalWithCity);
    const response = await supertest(app).get(`/api/shelters/${shelter._id}/animals`);
    expect(response.body[0].city).toBe(testAnimalWithCity.city);
  });

  it('GET  request to /shelters/:shelterId/animals with a non-existent shelter should return 404', async () => {
    const response = await supertest(app).get(`/api/shelters/303030303030303030303030/animals`);
    expect(response.statusCode).toBe(404);
  });

  it('POST request to /shelters/:shelterId/animals should add an animal', async () => {
    const addedShelter = (await supertest(app).post('/api/shelters').send(testShelter)).body;
    // adding animal to shelter above
    await supertest(app).post(`/api/shelters/${addedShelter._id}/animals`).send(testAnimal);

    const shelterWithAnimal = (await supertest(app).get(`/api/shelters/${addedShelter._id}`)).body;
    expect(shelterWithAnimal.animals.length === 1).toBe(true);
  });

  it('POST request to /shelters/:shelterId/animals with a non-existent shelter should return 404', async () => {
    const response = await supertest(app).post(`/api/shelters/303030303030303030303030/animals`);
    expect(response.statusCode).toBe(404);
  });

  // <--===---===--> POST <--===---===--> //

  it('GET  request to /shelters/:shelterId/posts should list at least one post', async () => {
    const shelter = (await supertest(app).post('/api/shelters').send(testShelter)).body;
    await supertest(app).post(`/api/shelters/${shelter._id}/posts`).send(testPost);
    const response = await supertest(app).get(`/api/shelters/${shelter._id}/posts`);
    expect(response.body.length).toBe(1);
  });

  it('GET  request to /shelters/:shelterId/posts with a non-existent shelter should return 404', async () => {
    const response = await supertest(app).get(`/api/shelters/303030303030303030303030/posts`);
    expect(response.statusCode).toBe(404);
  });

  it('POST request to /shelters/:shelterId/posts should add a post', async () => {
    const addedShelter = (await supertest(app).post('/api/shelters').send(testShelter)).body;
    // adding post to shelter above
    await supertest(app).post(`/api/shelters/${addedShelter._id}/posts`).send(testPost);

    const shelterWithPost = (await supertest(app).get(`/api/shelters/${addedShelter._id}`)).body;
    expect(shelterWithPost.posts.length === 1).toBe(true);
  });

  it('POST request to /shelters/:shelterId/post with a non-existent shelter should return 404', async () => {
    const response = await supertest(app).post(`/api/shelters/303030303030303030303030/posts`);
    expect(response.statusCode).toBe(404);
  });
});
