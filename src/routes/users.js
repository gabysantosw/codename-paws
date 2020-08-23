const express = require('express');

const router = express.Router();

const Caretaker = require('../models/caretaker');
const Animal = require('../models/animal');
const Post = require('../models/post');

router.get('/init', async (req, res) => {
  const laia = await Caretaker.create({ name: 'Laiaaa', city: 'Barcelona' });

  await laia.addAnimal(await Animal.create({ name: 'Ellie' }));
  await laia.addPost(await Post.create({ title: 'Very smol' }));

  const gaby = await Caretaker.create({ name: 'Gaby', city: 'Madrid' });

  await gaby.addAnimal(await Animal.create({ name: 'Luke' }));
  await gaby.addAnimal(await Animal.create({ name: 'Brownie' }));
  await gaby.addPost(await Post.create({ title: 'Awwww' }));
  await gaby.addPost(await Post.create({ title: 'Update!' }));

  res.sendStatus(200);
});

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

// GET users by id using query parameters
router.get('/:userId', async (req, res) => {
  const user = await Caretaker.findById(req.params.userId);
  // no user was found with that id -> 404 error
  if (!user) return res.sendStatus(404);

  // console.log(user.info);
  // res.render('caretaker', { user });
  return res.json(user);
});

// POST new animal to a given caretaker
router.post('/:userId/animals', async (req, res) => {
  const user = await Caretaker.findById(req.params.userId);
  // no user was found with that id -> 404 error
  if (!user) return res.sendStatus(404);

  const animal = await Animal.create({ name: req.body.name });
  await user.addAnimal(animal);

  return res.send(animal);
});

module.exports = router;
