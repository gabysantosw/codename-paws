const express = require('express');

const router = express.Router();

const Caretaker = require('../models/caretaker');
const Animal = require('../models/animal');
const Post = require('../models/post');

router.get('/init', async (req, res) => {
  const laia = await Caretaker.create({ name: 'Laiaaa', city: 'Barcelona' });

  laia.addAnimal(await Animal.create({ name: 'Ellie' }));
  laia.addPost(await Post.create({ title: 'Very smol' }));

  const gaby = await Caretaker.create({ name: 'Gaby', city: 'Madrid' });

  gaby.addAnimal(await Animal.create({ name: 'Luke' }));
  gaby.addAnimal(await Animal.create({ name: 'Brownie' }));
  gaby.addPost(await Post.create({ title: 'Awwww' }));
  gaby.addPost(await Post.create({ title: 'Update' }));

  res.sendStatus(200);
});

// GET all users & handle queries by name
router.get('/', async (req, res) => {
  const query = {};

  // check for a name query
  if (req.query.name) {
    query.name = req.query.name;
  }

  // show all users since there's no query
  // res.send(await Caretaker.find(query));
  // await Caretaker.find(query);
  const caretakers = await Caretaker.find(query);
  res.render('caretakers', { caretakers });
});

// GET users by id using query parameters
router.get('/:userId', async (req, res) => {
  const user = await Caretaker.findById(req.params.userId);

  // check existance of user with given id
  if (user) {
    console.log(user.info);
    res.render('caretaker', { user });
    // res.json(user);
  }
  // no user with that id -> 404 error
  else res.sendStatus(404);
});

module.exports = router;
