const express = require('express');

const router = express.Router();

const Caretaker = require('../models/caretaker');
const Animal = require('../models/animal');
const Post = require('../models/post');

const laia = new Caretaker('Laia');
laia.addAnimal(new Animal('Ellie'));
laia.addPost(new Post('Smol beans'));

const gaby = new Caretaker('Gaby');
gaby.addAnimal(new Animal('Luke'));
gaby.addAnimal(new Animal('Brownie'));
gaby.addPost(new Post('Awwww'));
gaby.addPost(new Post('Update'));
gaby.addPost(new Post('Look at this!'));

const users = [laia, gaby];

// GET all users & handle queries by name
router.get('/', (req, res) => {
  // check for a name query
  if (req.query.name) {
    return res.send(users.filter(user => user.name.toLowerCase() === req.query.name.toLowerCase()));
  }

  // show all users since there's no query
  return res.send(users);
});

// GET users by id using query parameters
router.get('/:userId', (req, res) => {
  const user = users[req.params.userId];

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
