require('dotenv').config();

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../../models/User');
const { validateRegisterInput, validateLoginInput } = require('../../validation/dataValidator');

const router = express.Router();

const generateAccessToken = (payload) =>
  `Bearer ${jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5m' })}`;

const deleteRefreshToken = (token) => {
  User.findOneAndUpdate({ refreshToken: token }, { $pull: { refreshToken: token } }, (err) => {
    if (!err) return true;
  });
};

// Register new user (by unique email)
router.post('/register', (req, res) => {
  // Check if data is valid
  const { errors, isValid } = validateRegisterInput(req.body);
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

// Login existing user
router.post('/login', (req, res) => {
  // Check if data is valid
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) return res.status(400).json(errors);

  const { email, password } = req.body;

  // Find user in database by email
  User.findOne({ email }, (err, foundUser) => {
    if (err) throw err;
    if (!foundUser) return res.status(404).json({ emailnotfound: 'Email not found' });

    // Check password
    bcrypt.compare(password, foundUser.password, (err, isMatch) => {
      if (err) throw err;
      // Password is correct
      if (isMatch) {
        // Create JWT Payload
        const payload = {
          id: foundUser.id,
          name: foundUser.name,
        };
        // Generate token
        const accessToken = generateAccessToken(payload);
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH, { expiresIn: '24h' });
        // Save refresh token
        foundUser.refreshToken.push(refreshToken);
        foundUser.save();
        res.json({ accessToken, refreshToken });
      } else {
        res.status(401).json({ unauthorized: 'Unauthorized access' });
      }
    });
  });
});

// Refresh jwt
router.post('/token', (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken === null) return res.sendStatus(401);

  jwt.verify(refreshToken, process.env.JWT_REFRESH, (err, payload) => {
    if (err) {
      // if refresh token is expired delete it from server
      if (err.name === 'TokenExpiredError') {
        deleteRefreshToken(refreshToken);
      }
      return res.sendStatus(401);
    }
    User.findById(payload.id, (err, foundUser) => {
      if (err) throw err;
      if (!foundUser.refreshToken.includes(refreshToken)) return res.sendStatus(401);
      const accessToken = generateAccessToken({ id: payload.id, name: payload.name });
      res.status(201).json({ accessToken });
    });
  });
});

// Logout user - delete refresh token
router.delete('/logout', (req, res) => {
  const { token } = req.body;

  deleteRefreshToken(token);
  return res.sendStatus(200);
});

module.exports = router;
