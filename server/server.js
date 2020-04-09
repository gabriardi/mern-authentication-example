require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const users = require('./routes/api/users');

// Connect to MongoDB
mongoose
  .connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => console.log(err));

const app = express();
app.use(express.json());

// Routes
app.use('/api/users', users);

app.listen(process.env.PORT || 5000);
