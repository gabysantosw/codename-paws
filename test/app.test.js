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
  it('GET request to /users should list users', async () => {
    // add user
    const response = await supertest(app).get('/users');
    expect(response.body.length > 0).toBe(true);
  });

  it('GET request to /users should list users', async () => {
    // add user with Gaby name
    const response = await supertest(app).get('/users?name=Gaby');
    expect(response.body.length > 0).toBe(true);
  });

  it('GET request to /init should give an OK status', async () => {
    const response = await supertest(app).get('/users/init');

    expect(response.statusCode).toBe(200);
  });

  it('POST request to /:userId/animals should add an animal', async () => {
    // create user
    // add animal
    const response = await supertest(app).get('/users/init');

    // check if added user has an animal with the same name
    expect(response.statusCode).toBe(200);
  });

  // test /:userId
  // create user
  // get their id
  // test existance
});
