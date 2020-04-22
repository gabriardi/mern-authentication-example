/* eslint-disable no-shadow */
import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { useHistory } from 'react-router-dom';

import { setShowRegisterFace } from '../../../redux/UIControls/UIControls.actions';

import styles from './FormCard.module.scss';

import FormLogin from '../../../components/Form/FormLogin';
import FormRegister from '../../../components/Form/FormRegister';

const FormCard = ({
  resetLoginUserDataAndErrors,
  showRegisterFace,
  setShowRegisterFace,
  handleFormSubmit,
  handleInputChange,
  loginUserData,
  registerUserData,
}) => {
  const history = useHistory();

  const handleSwitchFormClick = (event) => {
    const { name } = event.target;
    if (name === 'login') {
      setShowRegisterFace(false);
      history.push('/login');
    } else if (name === 'register') {
      setShowRegisterFace(true);
      history.push('/register');
    }
  };

  const cx = classNames.bind(styles);

  const formCardClass = cx({
    formCard: true,
    flip: showRegisterFace,
  });

  return (
    <div className={formCardClass}>
      <div className={styles.formCardLogin}>
        <FormLogin
          handleFormSubmit={handleFormSubmit}
          handleFormInput={handleInputChange}
          resetLoginUserDataAndErrors={resetLoginUserDataAndErrors}
          formData={loginUserData}
        />
        <p>
          Not registered?{' '}
          <button
            name="register"
            type="button"
            onClick={handleSwitchFormClick}
            className={styles.btn}
          >
            Create an account
          </button>
        </p>
      </div>
      <div className={styles.formCardRegister}>
        <FormRegister
          handleFormSubmit={handleFormSubmit}
          handleFormInput={handleInputChange}
          formData={registerUserData}
        />
        <p>
          Already registered?{' '}
          <button
            type="button"
            name="login"
            onClick={handleSwitchFormClick}
            className={styles.btn}
          >
            Login here
          </button>
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  showRegisterFace: state.UIControls.showRegisterFace,
});

export default connect(mapStateToProps, { setShowRegisterFace })(FormCard);
