const express = require('express');

const router = express.Router();

const Animal = require('../models/animal');

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

// GET animal by id
router.get('/:animalId', async (req, res) => {
  const animal = await Animal.findById(req.params.animalId);
  // no animal was found with that id
  if (!animal) return res.sendStatus(404);

  return res.send(animal);
});

// DELETE animals by ID
router.delete('/:animalId', async (req, res) => {
  const animal = await Animal.findOneAndRemove({ _id: req.params.animalId });
  // .findOneAndRemove returns the deleted animal
  // so if there's none, no animal with that Id was found -> 404
  if (!animal) return res.sendStatus(404);

  // removed successfully
  return res.sendStatus(200);
});

// PUT / update animal by ID
router.put('/:animalId', async (req, res) => {
  const animal = await Animal.findOneAndUpdate({ _id: req.params.animalId }, req.body);

  if (!animal) return res.sendStatus(404);

  // removed successfully
  return res.sendStatus(200);
});

module.exports = router;
