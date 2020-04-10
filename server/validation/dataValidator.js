const validator = require('validator');
const isEmpty = require('is-empty');

const validateRegisterInput = (data) => {
  const errors = {};

  // Name checks
  if (isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }
  // Email checks
  if (isEmpty(data.email)) {
    errors.email = 'Email field is required';
  } else if (!validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  // Password checks
  if (isEmpty(data.password)) {
    errors.password = 'Password field is required';
  } else if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be at least 6 characters';
  }
  if (isEmpty(data.password2)) {
    errors.password2 = 'Confirm password field is required';
  } else if (!validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords must match';
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

const validateLoginInput = (data) => {
  const errors = {};

  // Email checks
  if (isEmpty(data.email)) {
    errors.email = 'Email field is required';
  } else if (!validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  // Password checks
  if (isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = { validateRegisterInput, validateLoginInput };
