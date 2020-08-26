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
  // const testAnimal = { name: 'Lil', type: 'Dog' };
  const testPost = { title: 'Hiii' };

  it('GET  request to /posts should list at least one post', async () => {
    const user = (await supertest(app).post('/api/users').send(testUser)).body;
    await supertest(app).post(`/api/users/${user._id}/posts`).send(testPost);
    const response = await supertest(app).get('/api/posts');
    expect(response.body.length > 0).toBe(true);
  });

  it('DELETE request to /post/:postId should remove the post', async () => {
    const addedUser = (await supertest(app).post('/api/users').send(testUser)).body;
    // adding animal to user above
    const postToDelete = (await supertest(app).post(`/api/users/${addedUser._id}/posts`).send(testPost)).body;

    await supertest(app).delete(`/api/posts/${postToDelete._id}`);
    expect(addedUser.posts.length).toBe(0);
  });

  it('DELETE request to /users/:animalId with a non-existent user should return 404', async () => {
    const response = await supertest(app).delete(`/api/posts/303030303030303030303030`);
    expect(response.statusCode).toBe(404);
  });
});
