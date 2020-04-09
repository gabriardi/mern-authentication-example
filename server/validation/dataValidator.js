const validator = require('validator');
const isEmpty = require('is-empty');

const dataValidator = (data, type) => {
  const errors = {};

  if (isEmpty(data.email)) errors.email = 'email is required';
  if (isEmpty(data.password)) errors.password = 'password is required';
  if (!validator.isEmail(data.email)) errors.email = 'email is not valid';

  // Validates remaining registration data.
  if (type === 'register') {
    if (isEmpty(data.name)) errors.name = 'name is required';
  }

  return { errors, isValid: isEmpty(errors) };
};

module.exports = dataValidator;
