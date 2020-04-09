const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../../models/User');

const router = express.Router();

router.post('/register', (req, res) => {});
router.post('/login', (req, res) => {});

module.exports = router;
