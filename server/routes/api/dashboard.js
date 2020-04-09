const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  // Fake api request: if user is authenticated and has valid token returns json with photos
  const url = 'https://jsonplaceholder.typicode.com/photos';
  res.redirect(url);
});

module.exports = router;
