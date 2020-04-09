require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const users = require('./routes/api/users');
const dashboard = require('./routes/api/dashboard');

// Connect to MongoDB
// mongoose
//   .connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_URL}`, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .catch((err) => console.log(err));

// Local testing
mongoose
  .connect(`mongodb://localhost:27017/userDB?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .catch((err) => console.log(err));
// /////

const app = express();
app.use(express.json());
// Passport middleware
app.use(passport.initialize());
// Passport configuration
require('./config/passport')(passport);

// Routes
app.use('/api/users', users);
app.use('/api/dashboard', dashboard);

app.listen(process.env.PORT || 5000);
