const express = require('express');

const router = express.Router();

const Shelter = require('../models/shelter');
const Animal = require('../models/animal');
const Post = require('../models/post');

router.get('/init', async (req, res) => {
  const laia = new Shelter({ email: 'papaya@asdf.com', name: 'Laia', city: 'Barcelona' });
  await laia.setPassword('test');
  await laia.save();

  await laia.addAnimal(await Animal.create({ name: 'Ellie', city: 'Barcelona', type: 'Dog' }));
  await laia.addPost(await Post.create({ title: 'Very smol' }));

  const gaby = new Shelter({ email: 'ciruela@asdf.com', name: 'Gaby', city: 'Madrid' });
  await gaby.setPassword('test');
  await gaby.save();

  await gaby.addAnimal(await Animal.create({ name: 'Luke', city: 'Madrid', type: 'Dog' }));
  await gaby.addAnimal(await Animal.create({ name: 'Brownie', city: 'Madrid', type: 'Cat' }));
  await gaby.addPost(await Post.create({ title: 'Awwww' }));
  await gaby.addPost(await Post.create({ title: 'Update!' }));

  res.sendStatus(200);
});

// <--===---===-->
// <--===---===--> Shelter <--===---===--> //
// <--===---===-->

// GET all Shelters & handle queries by name / city
router.get('/', async (req, res) => {
  const query = {};

  // check query parameters by name or city
  if (req.query.name) {
    query.name = req.query.name;
  }
  if (req.query.city) {
    query.city = req.query.city;
  }

  const queryList = await Shelter.find(query);
  // res.render('Shelters', { Shelters });
  res.send(queryList);
});

// POST new Shelter to database
router.post('/', async (req, res) => {
  const newShelter = await Shelter.create(req.body);
  res.send(newShelter);
});

// GET Shelter by id
router.get('/:shelterId', async (req, res) => {
  const shelter = await Shelter.findById(req.params.shelterId);
  // no user was found with that id -> 404 error
  if (!shelter) return res.sendStatus(404);

  return res.send(shelter);
});

// DELETE Shelter by id
router.delete('/:shelterId', async (req, res) => {
  const user = await Shelter.findOneAndRemove({ _id: req.params.shelterId });
  // .findOneAndRemove returns the deleted user
  // so if there's none, no user with that Id was found -> 404
  if (!user) return res.sendStatus(404);

  // removed successfully
  return res.sendStatus(200);
});

// PUT / update Shelter by ID

// <--===---===-->
// <--===---===--> ANIMAL <--===---===--> //
// <--===---===-->

// GET all animals from the same Shelter
router.get('/:shelterId/animals', async (req, res) => {
  const shelter = await Shelter.findById(req.params.shelterId);
  // no shelter was found with that id -> 404 error
  if (!shelter) return res.sendStatus(404);

  return res.send(shelter.animals);
});

// POST new animal to a given Shelter
router.post('/:shelterId/animals', async (req, res) => {
  const shelter = await Shelter.findById(req.params.shelterId);
  // no shelter was found with that id -> 404 error
  if (!shelter) return res.sendStatus(404);

  // if no city is given, default to the one in the shelter
  let { city } = req.body;
  if (!city) city = shelter.city;

  const animal = await Animal.create({ name: req.body.name, city, type: req.body.type });
  await shelter.addAnimal(animal);

  return res.send(animal);
});

// <--===---===-->
// <--===---===--> POST <--===---===--> //
// <--===---===-->

// GET all posts from the same Shelter
router.get('/:shelterId/posts', async (req, res) => {
  const shelter = await Shelter.findById(req.params.shelterId);
  // no user was found with that id -> 404 error
  if (!shelter) return res.sendStatus(404);

  return res.send(shelter.posts);
});

// POST new post in a given Shelter
router.post('/:shelterId/posts', async (req, res) => {
  const shelter = await Shelter.findById(req.params.shelterId);
  // no user was found with that id -> 404 error
  if (!shelter) return res.sendStatus(404);

  const post = await Post.create({ title: req.body.title });
  await shelter.addPost(post);

  return res.send(post);
});

module.exports = router;
