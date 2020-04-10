const { validateRegisterInput, validateLoginInput } = require('./dataValidator');

// Register input
test('register input is valid', () => {
  const { errors, isValid } = validateLoginInput({
    name: 'gabriele',
    email: 'test@test.com',
    password: 'test1234',
    password2: 'test1234',
  });
  expect(errors).toMatchObject({});
  expect(isValid).toBe(true);
});
test('register input is valid also if there are not expected properties', () => {
  const { errors, isValid } = validateLoginInput({
    name: 'gabriele',
    email: 'test@test.com',
    password: 'test1234',
    password2: 'test1234',
    unexpected: 'test',
    unexpectedEmpty: '',
  });
  expect(errors).toMatchObject({});
  expect(isValid).toBe(true);
});
test('register input object is empty', () => {
  const { errors, isValid } = validateRegisterInput({});
  expect(errors).toMatchObject({
    name: 'Name field is required',
    email: 'Email field is required',
    password: 'Password field is required',
    password2: 'Confirm password field is required',
  });
  expect(errors).toBeTruthy();
  expect(isValid).toBe(false);
});
test('register input strings are empty', () => {
  const { errors, isValid } = validateRegisterInput({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  expect(errors).toBeTruthy();
  expect(isValid).toBe(false);
});
test('register input fields not expected', () => {
  const { errors, isValid } = validateRegisterInput({ unexpected: 'test', unexpectedEmpty: '' });
  expect(errors).toBeTruthy();
  expect(isValid).toBe(false);
});

// Login input
test('login input is valid', () => {
  const { errors, isValid } = validateLoginInput({ email: 'test@test.com', password: 'test1234' });
  expect(errors).toMatchObject({});
  expect(isValid).toBe(true);
});
test('login input is valid also if there are not expected properties', () => {
  const { errors, isValid } = validateLoginInput({
    name: 'gabriele',
    email: 'test@test.com',
    password: 'test1234',
    password2: 'test1234',
    unexpected: 'test',
    unexpectedEmpty: '',
  });
  expect(errors).toMatchObject({});
  expect(isValid).toBe(true);
});

test('login input object is empty', () => {
  const { errors, isValid } = validateLoginInput({});
  expect(errors).toBeTruthy();
  expect(isValid).toBe(false);
});
test('login input strings are empty', () => {
  const { errors, isValid } = validateLoginInput({ email: '', password: '' });
  expect(errors).toBeTruthy();
  expect(isValid).toBe(false);
});
test('login input email is empty', () => {
  const { errors, isValid } = validateLoginInput({ email: '', password: 'test' });
  expect(errors).toBeTruthy();
  expect(isValid).toBe(false);
});
test('login input email is invalid', () => {
  const { errors, isValid } = validateLoginInput({ email: 'gabriele test', password: 'test' });
  expect(errors).toBeTruthy();
  expect(isValid).toBe(false);
});
test('login input password is empty', () => {
  const { errors, isValid } = validateLoginInput({ email: 'test@email.com', password: '' });
  expect(errors).toBeTruthy();
  expect(isValid).toBe(false);
});
test('login input fields not expected', () => {
  const { errors, isValid } = validateLoginInput({ unexpected: 'test', unexpectedEmpty: '' });
  expect(errors).toBeTruthy();
  expect(isValid).toBe(false);
});
