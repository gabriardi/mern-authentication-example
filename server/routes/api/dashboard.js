const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  // Fake api request: if user is authenticated and has valid token returns json with profiles
  const url = 'https://randomuser.me/api/?inc=gender,name,nat,picture,location&results=30';
  res.redirect(url);
});

module.exports = router;
