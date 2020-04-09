const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../../models/User');
const dataValidator = require('../../validation/dataValidator');

const router = express.Router();

router.post('/register', (req, res) => {
  // Check if data is valid
  const { errors, isValid } = dataValidator(req.body, 'register');
  if (!isValid) return res.status(400).json(errors);

  const { name, email, password } = req.body;

  // If the email is found, send error message otherwise create new user
  User.findOne({ email }, (err, foundUser) => {
    if (err) throw err;
    if (foundUser) {
      res.status(409).json({ email: 'email already exists' });
    } else {
      const newUser = new User({ name, email, password });

      // Hash password
      bcrypt.hash(newUser.password, 10, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save((err, user) => {
          if (err) throw err;
          res.json(user);
        });
      });
    }
  });
});

router.post('/login', (req, res) => {
  // Check if data is valid
  const { error, isValid } = dataValidator(req.body, 'login');
  if (!isValid) res.status(400).json(error);

  const { email, password } = req.body;
});

module.exports = router;
