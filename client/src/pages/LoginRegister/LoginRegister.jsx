import React, { useState } from 'react';
import { connect } from 'react-redux';

import { loginUser, registerUser } from '../../redux/auth/auth.actions';
import { clearErrors } from '../../redux/errors/errors.actions';

import styles from './LoginRegister.module.scss';

import { EMAIL_VALIDATION_PATTERN } from '../../components/Form/utils/validationPatterns';

import FormCard from './FormCard';

// eslint-disable-next-line no-shadow
const Login = ({ loginUser, registerUser, clearErrors }) => {
  // State for form entries
  const initialLoginUserData = {
    email: '',
    password: '',
  };
  const [loginUserData, setLoginUserData] = useState(initialLoginUserData);
  const [registerUserData, setRegisterUserData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const handleInputChange = (event) => {
    const { id, name, value } = event.target;

    // Use regex to check whether event originated from Login or Register form
    if (id.match(/login/)) {
      setLoginUserData((prev) => {
        return { ...prev, [name]: value };
      });
    }
    if (id.match(/register/)) {
      setRegisterUserData((prev) => {
        return { ...prev, [name]: value };
      });
    }
  };

  const isDataValid = (data) => {
    let isValid = true;
    if (data.name !== undefined && data.name.length < 2) isValid = false;
    if (!data.email.match(RegExp(EMAIL_VALIDATION_PATTERN))) isValid = false;
    if (data.password.length < 6) isValid = false;
    if (data.password2 !== undefined && data.password !== data.password2)
      isValid = false;
    return isValid;
  };

  const handleFormSubmit = (e) => {
    const { id } = e.target;
    if (id === 'loginForm') {
      if (isDataValid(loginUserData)) {
        loginUser(loginUserData);
      }
    } else if (id === 'registerForm') {
      if (isDataValid(registerUserData)) {
        registerUser(registerUserData);
      }
    }
    e.preventDefault();
  };

  const resetLoginUserDataAndErrors = () => {
    setLoginUserData(initialLoginUserData);
    clearErrors();
  };

  return (
    <div className={styles.LoginRegister}>
      <div className={styles.backgroundImg} />
      <FormCard
        resetLoginUserDataAndErrors={resetLoginUserDataAndErrors}
        handleFormSubmit={handleFormSubmit}
        handleInputChange={handleInputChange}
        loginUserData={loginUserData}
        registerUserData={registerUserData}
      />
    </div>
  );
};

export default connect(null, { loginUser, registerUser, clearErrors })(Login);
