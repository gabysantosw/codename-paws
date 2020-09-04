const express = require('express');

const router = express.Router();

const Post = require('../models/post');

// <--===---===-->
// <--===---===--> POST <--===---===--> //
// <--===---===-->

// GET all posts & handle queries by city
router.get('/', async (req, res) => {
  const query = {};

  const queryList = await Post.find(query);
  res.send(queryList);
});

// DELETE post by ID
router.delete('/:postId', async (req, res) => {
  const user = await Post.findOneAndRemove({ _id: req.params.postId });
  // .findOneAndRemove returns the deleted post
  // so if there's none, no post with that Id was found -> 404
  if (!user) return res.sendStatus(404);

  // removed successfully
  return res.sendStatus(200);
});

// PUT / update post by ID

module.exports = router;
