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

// GET post by id
router.get('/:postId', async (req, res) => {
  const post = await Post.findById(req.params.postId);
  // no animal was found with that id
  if (!post) return res.sendStatus(404);

  return res.send(post);
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
router.put('/:postId', async (req, res) => {
  const post = await Post.findOneAndUpdate({ _id: req.params.postId }, req.body);

  if (!post) return res.sendStatus(404);

  // removed successfully
  return res.sendStatus(200);
});

module.exports = router;
