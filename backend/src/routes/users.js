const express = require('express');

const router = express.Router();

const Caretaker = require('../models/caretaker');
const Animal = require('../models/animal');
const Post = require('../models/post');

router.get('/init', async (req, res) => {
  const laia = await Caretaker.create({ name: 'Laiaaa', city: 'Barcelona' });

  await laia.addAnimal(await Animal.create({ name: 'Ellie', city: 'Barcelona' }));
  await laia.addPost(await Post.create({ title: 'Very smol' }));

  const gaby = await Caretaker.create({ name: 'Gaby', city: 'Madrid' });

  await gaby.addAnimal(await Animal.create({ name: 'Luke', city: 'Madrid' }));
  await gaby.addAnimal(await Animal.create({ name: 'Brownie', city: 'Madrid' }));
  await gaby.addPost(await Post.create({ title: 'Awwww' }));
  await gaby.addPost(await Post.create({ title: 'Update!' }));

  res.sendStatus(200);
});

// <--===---===-->
// <--===---===--> CARETAKER <--===---===--> //
// <--===---===-->

// GET all users & handle queries by name / city
router.get('/', async (req, res) => {
  const query = {};

  // check query parameters by name or city
  if (req.query.name) {
    query.name = req.query.name;
  }
  if (req.query.city) {
    query.city = req.query.city;
  }

  const queryList = await Caretaker.find(query);
  // res.render('caretakers', { caretakers });
  res.send(queryList);
});

// POST new caretaker to database
router.post('/', async (req, res) => {
  const newUser = await Caretaker.create(req.body);
  res.send(newUser);
});

// GET users by id
router.get('/:userId', async (req, res) => {
  const user = await Caretaker.findById(req.params.userId);
  // no user was found with that id -> 404 error
  if (!user) return res.sendStatus(404);

  // console.log(user.info);
  // res.render('caretaker', { user });
  return res.send(user);
});

// DELETE users by id
router.delete('/:userId', async (req, res) => {
  const user = await Caretaker.findOneAndRemove({ _id: req.params.userId });
  // .findOneAndRemove returns the deleted user
  // so if there's none, no user with that Id was found -> 404
  if (!user) return res.sendStatus(404);

  return res.sendStatus(200);
});

// POST new caretaker to database
router.post('/', async (req, res) => {
  const newUser = await Caretaker.create(req.body);
  res.send(newUser);
});

// <--===---===-->
// <--===---===--> ANIMAL <--===---===--> //
// <--===---===-->

// GET all animals from the same caretaker
router.get('/:userId/animals', async (req, res) => {
  const user = await Caretaker.findById(req.params.userId);
  // no user was found with that id -> 404 error
  if (!user) return res.sendStatus(404);

  return res.send(user.animals);
});

// POST new animal to a given caretaker
router.post('/:userId/animals', async (req, res) => {
  const user = await Caretaker.findById(req.params.userId);
  // no user was found with that id -> 404 error
  if (!user) return res.sendStatus(404);

  // if no city is given, default to the one in the user
  let { city } = req.body;
  if (!city) city = user.city;

  const animal = await Animal.create({ name: req.body.name, city });
  await user.addAnimal(animal);

  return res.send(animal);
});

// <--===---===-->
// <--===---===--> POST <--===---===--> //
// <--===---===-->

// GET all posts from the same caretaker
router.get('/:userId/posts', async (req, res) => {
  const user = await Caretaker.findById(req.params.userId);
  // no user was found with that id -> 404 error
  if (!user) return res.sendStatus(404);

  return res.send(user.posts);
});

// POST new post in a given caretaker
router.post('/:userId/posts', async (req, res) => {
  const user = await Caretaker.findById(req.params.userId);
  // no user was found with that id -> 404 error
  if (!user) return res.sendStatus(404);

  const post = await Post.create({ title: req.body.title });
  await user.addPost(post);

  return res.send(post);
});

module.exports = router;
