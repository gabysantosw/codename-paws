const express = require('express');

const router = express.Router();

// const Caretaker = require('../models/caretaker');
const Animal = require('../models/animal');
// const Post = require('../models/post');

// /animals?caretaker=gaby
// /animals
// /animals/:animalId

// <--===---===-->
// <--===---===--> ANIMAL <--===---===--> //
// <--===---===-->

// GET all animals & handle queries by city / type
// GET all animals & handle queries by city
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

module.exports = router;
