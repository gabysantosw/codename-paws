const express = require('express');

const router = express.Router();

// const Caretaker = require('../models/caretaker');
const Animal = require('../models/animal');
// const Post = require('../models/post');

// <--===---===-->
// <--===---===--> ANIMAL <--===---===--> //
// <--===---===-->

// GET all animals & handle queries by city / type
router.get('/', async (req, res) => {
  const query = {};

  if (req.query.city) {
    query.city = req.query.city;
  }
  if (req.query.type) {
    query.type = req.query.type;
  }

  const queryList = await Animal.find(query);
  res.send(queryList);
});

// DELETE animals by ID
router.delete('/:userId', async (req, res) => {
  const user = await Animal.findOneAndRemove({ _id: req.params.userId });
  // .findOneAndRemove returns the deleted user
  // so if there's none, no animal with that Id was found -> 404
  if (!user) return res.sendStatus(404);

  // removed successfully
  return res.sendStatus(200);
});

// PUT / update animal by ID

module.exports = router;
