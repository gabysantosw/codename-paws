const express = require('express');
const { uploadImage, deleteImage } = require('../helpers/cloud-storage');

const router = express.Router();

const Shelter = require('../models/shelter');
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

  // remove associated image from cloud storage
  if (animal.image) {
    await deleteImage(animal.image);
  }

  // removed successfully
  return res.sendStatus(200);
});

// PUT / update animal by ID
router.put('/:animalId', async (req, res) => {
  const shelter = await Shelter.findById(req.body.shelterId);

  // no shelter was found with that id -> 404 error
  if (!shelter) return res.sendStatus(404);

  if (shelter.animals.includes(req.params.animalId)) return res.sendStatus(404);

  const animal = await Animal.findById(req.params.animalId);

  const { name, city, type } = req.body;

  // if an image was given, upload to cloud storage
  // when no file was added in the form req.file = undefined
  let imageUrl;
  if (req.file) {
    // check if animal already had an image, delete before uploading new
    if (animal.image) {
      await deleteImage(animal.image);
    }

    const { originalname, buffer } = req.file;

    imageUrl = await uploadImage(buffer, originalname, `${shelter.name}-${name}-${shelter.animals.length}`);

    await Animal.findOneAndUpdate({ _id: req.params.animalId }, { name, city, type, image: imageUrl });
  } else {
    await Animal.findOneAndUpdate({ _id: req.params.animalId }, { name, city, type });
  }

  // updated successfully
  return res.sendStatus(200);
});

module.exports = router;
