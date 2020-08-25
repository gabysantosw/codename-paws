/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
// const request = require('supertest');
const supertest = require('supertest');
const app = require('../src/app');

// routes/index.js
describe('Index', () => {
  it('GET request to / should give an OK status', async () => {
    const response = await supertest(app).get('/api/');
    expect(response.statusCode).toBe(200);
  });
});

// routes/users.js
describe('Users endpoints', () => {
  const testUser = { name: 'Coyote', city: 'Pawnee' };
  const testAnimal = { name: 'Lil', type: 'Dog' };
  const testPost = { title: 'Hiii' };

  it('POST request to /users should create a user', async () => {
    const responseUser = await supertest(app).post('/api/users').send(testUser);
    expect(responseUser.body.name).toBe(testUser.name);
    expect(responseUser.body.city).toBe(testUser.city);
  });

  it('GET  request to /users should list at least one user', async () => {
    await supertest(app).post('/api/users').send(testUser);
    const response = await supertest(app).get('/api/users');
    expect(response.body.length > 0).toBe(true);
  });

  it('GET  request to /users with a name query should list at least one user', async () => {
    await supertest(app).post('/api/users').send(testUser);
    const response = await supertest(app).get(`/api/users?name=${testUser.name}`);
    expect(response.body.length > 0).toBe(true);
  });

  it('GET  request to /users with a city query should list at least one user', async () => {
    await supertest(app).post('/api/users').send(testUser);
    const response = await supertest(app).get(`/api/users?city=${testUser.city}`);
    expect(response.body.length > 0).toBe(true);
  });

  it('GET request to /users/init should give an OK status', async () => {
    const response = await supertest(app).get('/api/users/init');
    expect(response.statusCode).toBe(200);
  });

  it('GET  request to /users/:userId should return an user', async () => {
    const addedUser = (await supertest(app).post('/api/users').send(testUser)).body;
    const response = await supertest(app).get(`/api/users/${addedUser._id}`);

    expect(response.body.name).toBe(testUser.name);
    expect(response.body.city).toBe(testUser.city);
  });

  it('GET  request to /users/:userId with a non-existent user should return 404', async () => {
    const response = await supertest(app).get(`/api/users/303030303030303030303030`);
    expect(response.statusCode).toBe(404);
  });

  it('DELETE request to /users/:userId should remove the user', async () => {
    const userToDelete = { name: 'Ayyy', city: 'Delete' };
    const addedUser = (await supertest(app).post('/api/users').send(userToDelete)).body;
    const response = await supertest(app).delete(`/api/users/${addedUser._id}`);
    expect(response.statusCode).toBe(200);
  });

  it('DELETE request to /users/:userId with a non-existent user should return 404', async () => {
    const response = await supertest(app).delete(`/api/users/303030303030303030303030`);
    expect(response.statusCode).toBe(404);
  });

  // <--===---===--> ANIMAL <--===---===--> //

  it('GET  request to /users/:userId/animals should list at least one animal', async () => {
    const user = (await supertest(app).post('/api/users').send(testUser)).body;
    await supertest(app).post(`/api/users/${user._id}/animals`).send(testAnimal);
    const response = await supertest(app).get(`/api/users/${user._id}/animals`);
    expect(response.body.length).toBe(1);
  });

  it('POST  request to /users/:userId/animals with an specific city, should match the given city', async () => {
    const testAnimalWithCity = { name: 'Choco', city: 'Caracas', type: 'Dog' };

    const user = (await supertest(app).post('/api/users').send(testUser)).body;
    await supertest(app).post(`/api/users/${user._id}/animals`).send(testAnimalWithCity);
    const response = await supertest(app).get(`/api/users/${user._id}/animals`);
    expect(response.body[0].city).toBe(testAnimalWithCity.city);
  });

  it('GET  request to /users/:userId/animals with a non-existent user should return 404', async () => {
    const response = await supertest(app).get(`/api/users/303030303030303030303030/animals`);
    expect(response.statusCode).toBe(404);
  });

  it('POST request to /users/:userId/animals should add an animal', async () => {
    const addedUser = (await supertest(app).post('/api/users').send(testUser)).body;
    // adding animal to user above
    await supertest(app).post(`/api/users/${addedUser._id}/animals`).send(testAnimal);

    const userWithAnimal = (await supertest(app).get(`/api/users/${addedUser._id}`)).body;
    expect(userWithAnimal.animals.length === 1).toBe(true);
  });

  it('POST request to /users/:userId/animals with a non-existent user should return 404', async () => {
    const response = await supertest(app).post(`/api/users/303030303030303030303030/animals`);
    expect(response.statusCode).toBe(404);
  });

  // <--===---===--> POST <--===---===--> //

  it('GET  request to /users/:userId/posts should list at least one post', async () => {
    const user = (await supertest(app).post('/api/users').send(testUser)).body;
    await supertest(app).post(`/api/users/${user._id}/posts`).send(testPost);
    const response = await supertest(app).get(`/api/users/${user._id}/posts`);
    expect(response.body.length).toBe(1);
  });

  it('GET  request to /users/:userId/posts with a non-existent user should return 404', async () => {
    const response = await supertest(app).get(`/api/users/303030303030303030303030/posts`);
    expect(response.statusCode).toBe(404);
  });

  it('POST request to /users/:userId/posts should add a post', async () => {
    const addedUser = (await supertest(app).post('/api/users').send(testUser)).body;
    // adding post to user above
    await supertest(app).post(`/api/users/${addedUser._id}/posts`).send(testPost);

    const userWithPost = (await supertest(app).get(`/api/users/${addedUser._id}`)).body;
    expect(userWithPost.posts.length === 1).toBe(true);
  });

  it('POST request to /users/:userId/post with a non-existent user should return 404', async () => {
    const response = await supertest(app).post(`/api/users/303030303030303030303030/posts`);
    expect(response.statusCode).toBe(404);
  });
});
