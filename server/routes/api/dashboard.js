/* eslint-disable no-underscore-dangle */
const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  // Fake api request: if user is authenticated and has valid token returns json with profiles
  // Use user id as seed to get same results each time
  const seed = req.user._id;
  const url = `https://randomuser.me/api/?inc=gender,name,nat,picture,location&results=30&seed=${seed}`;
  res.redirect(url);
});

module.exports = router;
