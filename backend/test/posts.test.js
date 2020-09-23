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
  // const testAnimal = { name: 'Lil', type: 'Dog' };
  const testPost = { title: 'Hiii' };

  it('GET  request to /posts should list at least one post', async () => {
    const shelter = (await supertest(app).post('/api/shelters').send(testShelter)).body;
    await supertest(app).post(`/api/shelters/${shelter._id}/posts`).send(testPost);
    const response = await supertest(app).get('/api/posts');
    expect(response.body.length > 0).toBe(true);
  });

  it('DELETE request to /post/:postId should remove the post', async () => {
    const addedShelter = (await supertest(app).post('/api/shelters').send(testShelter)).body;
    // adding animal to shelter above
    const postToDelete = (await supertest(app).post(`/api/shelters/${addedShelter._id}/posts`).send(testPost)).body;

    await supertest(app).delete(`/api/posts/${postToDelete._id}`);
    expect(addedShelter.posts.length).toBe(0);
  });

  it('DELETE request to /shelters/:animalId with a non-existent shelter should return 404', async () => {
    const response = await supertest(app).delete(`/api/posts/303030303030303030303030`);
    expect(response.statusCode).toBe(404);
  });
});
