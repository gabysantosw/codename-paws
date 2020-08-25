const express = require('express');

const router = express.Router();

// const Caretaker = require('../models/caretaker');
// const Animal = require('../models/animal');
const Post = require('../models/post');

// <--===---===-->
// <--===---===--> POST <--===---===--> //
// <--===---===-->

// GET all posts & handle queries by city
router.get('/', async (req, res) => {
  const query = {};

  if (req.query.city) {
    query.city = req.query.city;
  }

  const queryList = await Post.find(query);
  res.send(queryList);
});

// DELETE post by ID
router.delete('/:userId', async (req, res) => {
  const user = await Post.findOneAndRemove({ _id: req.params.userId });
  // .findOneAndRemove returns the deleted post
  // so if there's none, no post with that Id was found -> 404
  if (!user) return res.sendStatus(404);

  // removed successfully
  return res.sendStatus(200);
});

// PUT / update post by ID

module.exports = router;
