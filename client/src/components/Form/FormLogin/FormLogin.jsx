import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';

import { EMAIL_VALIDATION_PATTERN } from '../utils/validationPatterns';

import styles from './FormLogin.module.scss';

import FormGroup from '../FormGroup';
import InputText from '../../InputText';
import Button from '../../Button';

const FormLogin = ({
  resetLoginUserDataAndErrors,
  errorStatusCode,
  formData,
  handleFormSubmit,
  handleFormInput,
}) => {
  const cx = classNames.bind(styles);

  const errorModalClasses = cx({
    errorModalBtn: true,
    hidden: !errorStatusCode,
  });

  return (
    <FormGroup
      onSubmit={(e) => {
        handleFormSubmit(e);
      }}
      formId="loginForm"
    >
      <h2>Login to your account</h2>
      <InputText
        onChange={handleFormInput}
        type="email"
        name="email"
        id="loginEmail"
        placeholder="email"
        pattern={EMAIL_VALIDATION_PATTERN}
        value={formData.email}
        validationMessage="email"
      />
      <InputText
        onChange={handleFormInput}
        type="password"
        name="password"
        id="loginPassword"
        placeholder="password"
        value={formData.password}
        validationMessage="password"
      />
      <Button>Login</Button>
      <button
        type="button"
        onClick={resetLoginUserDataAndErrors}
        className={errorModalClasses}
      >
        <span className={styles.errorModalBtnVisible}>
          incorrect email or password
        </span>
        <span className={styles.errorModalBtnInvisible}>reset</span>
      </button>
    </FormGroup>
  );
};

const mapStateToProps = (state) => ({
  errorStatusCode: state.errors.response.status,
});

export default connect(mapStateToProps)(FormLogin);
