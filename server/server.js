require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const users = require('./routes/api/users');
const dashboard = require('./routes/api/dashboard');

const dbUri = process.env.DB_URI || 'mongodb://localhost:27017/userDB?retryWrites=true&w=majority';

mongoose
  .connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .catch((err) => console.log(err));

const app = express();
app.use(express.json());
// Passport middleware
app.use(passport.initialize());
// Passport configuration
require('./config/passport')(passport);

// Routes
app.use('/api/users', users);
app.use('/api/dashboard', dashboard);

const port = process.env.PORT || 5000;
app.listen(port, console.log(`Server listening on port ${port}`));
