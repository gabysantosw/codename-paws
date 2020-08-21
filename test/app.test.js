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
    const response = await supertest(app).get('/');
    expect(response.statusCode).toBe(200);
  });
});

// routes/users.js
describe('Users endpoints', () => {
  const testUser = { name: 'Coyote', city: 'Pawnee' };
  const testAnimal = { name: 'Lil' };
  const testPost = { title: 'Hiii' };

  it('POST request to /users should create a user', async () => {
    const responseUser = await supertest(app).post('/users').send(testUser);
    expect(responseUser.body.name).toBe(testUser.name);
    expect(responseUser.body.city).toBe(testUser.city);
  });

  it('GET  request to /users should list at least one user', async () => {
    await supertest(app).post('/users').send(testUser);
    const response = await supertest(app).get('/users');
    expect(response.body.length > 0).toBe(true);
  });

  it('GET  request to /users with a name query should list at least one user', async () => {
    await supertest(app).post('/users').send(testUser);
    const response = await supertest(app).get(`/users?name=${testUser.name}`);
    expect(response.body.length > 0).toBe(true);
  });

  it('GET  request to /users with a city query should list at least one user', async () => {
    await supertest(app).post('/users').send(testUser);
    const response = await supertest(app).get(`/users?city=${testUser.city}`);
    expect(response.body.length > 0).toBe(true);
  });

  it('GET request to /users/init should give an OK status', async () => {
    const response = await supertest(app).get('/users/init');
    expect(response.statusCode).toBe(200);
  });

  it('GET  request to /users/:userId should return an user', async () => {
    const addedUser = (await supertest(app).post('/users').send(testUser)).body;
    const response = await supertest(app).get(`/users/${addedUser._id}`);

    expect(response.body.name).toBe(testUser.name);
    expect(response.body.city).toBe(testUser.city);
  });

  it('POST request to /users/:userId/animals should add an animal', async () => {
    const addedUser = (await supertest(app).post('/users').send(testUser)).body;
    // adding animal to user above
    await supertest(app).post(`/users/${addedUser._id}/animals`).send(testAnimal);
    const userWithAnimal = (await supertest(app).get(`/users/${addedUser._id}`)).body;
    expect(userWithAnimal.animals.length === 1).toBe(true);
  });
});
