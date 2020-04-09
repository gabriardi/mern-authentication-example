require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_URL}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const app = express();

app.listen(5000);
