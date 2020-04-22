import React from 'react';

import { EMAIL_VALIDATION_PATTERN } from '../utils/validationPatterns';

import FormGroup from '../FormGroup';
import InputText from '../../InputText';
import Button from '../../Button';

const FormRegister = ({ formData, handleFormSubmit, handleFormInput }) => {
  return (
    <FormGroup
      onSubmit={(e) => {
        handleFormSubmit(e);
      }}
      formId="registerForm"
    >
      <h2>Register</h2>
      <InputText
        onChange={handleFormInput}
        type="text"
        name="name"
        id="registerName"
        placeholder="Name"
        value={formData.name}
        minlength="2"
        validationMessage="name"
      />
      <InputText
        onChange={handleFormInput}
        type="email"
        name="email"
        id="registerEmail"
        placeholder="Email"
        pattern={EMAIL_VALIDATION_PATTERN}
        value={formData.email}
        validationMessage="email"
      />
      <InputText
        onChange={handleFormInput}
        type="password"
        name="password"
        minlength="6"
        id="registerPassword"
        placeholder="Password"
        value={formData.password}
        validationMessage="password must be at least 6 characters"
      />
      <InputText
        onChange={handleFormInput}
        type="password"
        name="password2"
        pattern={formData.password}
        id="registerPassword2"
        placeholder="Confirm password"
        value={formData.password2}
        validationMessage="passwords must match"
      />
      <Button>Register</Button>
    </FormGroup>
  );
};

export default FormRegister;
