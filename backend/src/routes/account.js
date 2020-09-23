const express = require('express');
const passport = require('passport');

const Shelter = require('../models/shelter');

const router = express.Router();

router.get('/session', (req, res) => {
  res.send(req.user);
});

// to create new Shelter accounts
router.post('/', async (req, res) => {
  const { name, city, email, password } = req.body;

  const account = await Shelter.register({ name, city, email }, password);

  res.send(account);
});

// login
router.post('/session', passport.authenticate('local', { failWithError: true }), async (req, res) =>
  res.send(req.user)
);

router.delete('/session', async (req, res, next) => {
  await req.logout();

  req.session.regenerate(error => {
    if (error) return next(error);

    return res.sendStatus(200);
  });
});

module.exports = router;
