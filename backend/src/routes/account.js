const express = require('express');
const passport = require('passport');

const Shelter = require('../models/shelter');

const router = express.Router();

router.get('/session', (req, res) => {
  res.send(req.session);
});

// to create new Shelter accounts
router.post('/', async req => {
  const { name, age, email, password } = req.body;

  const account = new Shelter({ name, age, email });
  await account.setPassword(password);
  await account.save();

  return account;
});

router.post('/session', passport.authenticate('local', { failWithError: true }), async (req, res) =>
  res.send(req.user)
);

router.delete('/session', async (req, res, next) => {
  await req.logout();

  req.session.regenerate(err => {
    if (err) return next(err);

    return res.sendStatus(200);
  });
});

module.exports = router;
