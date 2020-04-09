/* eslint-disable camelcase */
require('dotenv').config();

const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

const User = require('../models/User');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id, (err, foundUser) => {
        if (err) throw err;
        if (foundUser) {
          return done(null, foundUser);
        }
        return done(null, false);
      });
    })
  );
};
