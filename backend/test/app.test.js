/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
// const mongoose = require('mongoose');
// const { MongoMemoryServer } = require('mongodb-memory-server');

const supertest = require('supertest');
const app = require('../src/app');

// const CaretakerModel = require('../src/models/caretaker');
// const AnimalModel = require('../src/models/animal');
// const PostModel = require('../src/models/post');

// // Start MongoDB instance
// const mongod = new MongoMemoryServer();

// // start the database and populate records before testing
// beforeAll(async () => {
//   const uri = await mongod.getConnectionString();
//   const debug = false;
//   await mongoose
//     .connect(uri, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useCreateIndex: true,
//     })
//     .then(() => {
//       if (debug) {
//         console.log('Fake Mongo connected');
//       }
//     })
//     .catch(err => console.error(err.message));

//   // populating database with dummy data
//   const testCaretaker = new CaretakerModel({ name: 'Coyote', city: 'Pawnee' });
//   const testAnimal = new AnimalModel({ name: 'Lil', type: 'Dog' });
//   const testPost = new PostModel({ title: 'Hiii' });

//   await testCaretaker.save();
//   await testAnimal.save();
//   await testPost.save();
// });

// afterAll(async () => {
//   await mongoose.disconnect();
//   await mongod.stop();
// });

// routes/index.js
describe('Index', () => {
  it('GET request to / should give an OK status', async () => {
    const response = await supertest(app).get('/api/');
    expect(response.statusCode).toBe(200);
  });
});

// routes/users.js
describe('Users endpoints', () => {
  const testCaretaker = { name: 'Coyote', city: 'Pawnee' };
  const testAnimal = { name: 'Lil', type: 'Dog' };
  const testPost = { title: 'Hiii' };

  it('POST request to /users should create a user', async () => {
    const responseUser = await supertest(app).post('/api/users').send(testCaretaker);
    expect(responseUser.body.name).toBe(testCaretaker.name);
    expect(responseUser.body.city).toBe(testCaretaker.city);
  });

  it('GET  request to /users should list at least one user', async () => {
    await supertest(app).post('/api/users').send(testCaretaker);
    const response = await supertest(app).get('/api/users');
    expect(response.body.length > 0).toBe(true);
  });

  it('GET  request to /users with a name query should list at least one user', async () => {
    await supertest(app).post('/api/users').send(testCaretaker);
    const response = await supertest(app).get(`/api/users?name=${testCaretaker.name}`);
    expect(response.body.length > 0).toBe(true);
  });

  it('GET  request to /users with a city query should list at least one user', async () => {
    await supertest(app).post('/api/users').send(testCaretaker);
    const response = await supertest(app).get(`/api/users?city=${testCaretaker.city}`);
    expect(response.body.length > 0).toBe(true);
  });

  it('GET request to /users/init should give an OK status', async () => {
    const response = await supertest(app).get('/api/users/init');
    expect(response.statusCode).toBe(200);
  });

  it('GET  request to /users/:userId should return an user', async () => {
    const addedUser = (await supertest(app).post('/api/users').send(testCaretaker)).body;
    const response = await supertest(app).get(`/api/users/${addedUser._id}`);

    expect(response.body.name).toBe(testCaretaker.name);
    expect(response.body.city).toBe(testCaretaker.city);
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
    const user = (await supertest(app).post('/api/users').send(testCaretaker)).body;
    await supertest(app).post(`/api/users/${user._id}/animals`).send(testAnimal);
    const response = await supertest(app).get(`/api/users/${user._id}/animals`);
    expect(response.body.length).toBe(1);
  });

  it('POST  request to /users/:userId/animals with an specific city, should match the given city', async () => {
    const testAnimalWithCity = { name: 'Choco', city: 'Caracas', type: 'Dog' };

    const user = (await supertest(app).post('/api/users').send(testCaretaker)).body;
    await supertest(app).post(`/api/users/${user._id}/animals`).send(testAnimalWithCity);
    const response = await supertest(app).get(`/api/users/${user._id}/animals`);
    expect(response.body[0].city).toBe(testAnimalWithCity.city);
  });

  it('GET  request to /users/:userId/animals with a non-existent user should return 404', async () => {
    const response = await supertest(app).get(`/api/users/303030303030303030303030/animals`);
    expect(response.statusCode).toBe(404);
  });

  it('POST request to /users/:userId/animals should add an animal', async () => {
    const addedUser = (await supertest(app).post('/api/users').send(testCaretaker)).body;
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
    const user = (await supertest(app).post('/api/users').send(testCaretaker)).body;
    await supertest(app).post(`/api/users/${user._id}/posts`).send(testPost);
    const response = await supertest(app).get(`/api/users/${user._id}/posts`);
    expect(response.body.length).toBe(1);
  });

  it('GET  request to /users/:userId/posts with a non-existent user should return 404', async () => {
    const response = await supertest(app).get(`/api/users/303030303030303030303030/posts`);
    expect(response.statusCode).toBe(404);
  });

  it('POST request to /users/:userId/posts should add a post', async () => {
    const addedUser = (await supertest(app).post('/api/users').send(testCaretaker)).body;
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
