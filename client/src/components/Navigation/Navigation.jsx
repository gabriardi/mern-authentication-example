import React from 'react';
import { connect } from 'react-redux';

import styles from './Navigation.module.scss';
import svgSprite from '../../assets/svg/sprite.svg';

import NavItem from './NavItem';
import Logo from '../Logo';

import { logoutUser } from '../../redux/auth/auth.actions';
import { setShowRegisterFace } from '../../redux/UIControls/UIControls.actions';

// eslint-disable-next-line no-shadow
const Navigation = ({ isAuthenticated, logoutUser, setShowRegisterFace }) => {
  return (
    <div className={styles.Navigation}>
      <Logo logo="mern auth example" />
      <div className={styles.NavItem}>
        {isAuthenticated ? (
          <NavItem
            onClick={(e) => {
              e.preventDefault();
              logoutUser();
            }}
            to="/logout"
          >
            <svg className={styles.logoutIcon}>
              <use xlinkHref={`${svgSprite}#icon-exit`} />
            </svg>
            Logout
          </NavItem>
        ) : (
          <>
            <NavItem
              onClick={() => {
                setShowRegisterFace(false);
              }}
              to="/login"
            >
              Login
            </NavItem>
            <NavItem
              onClick={() => {
                setShowRegisterFace(true);
              }}
              to="/register"
            >
              Register
            </NavItem>
          </>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logoutUser, setShowRegisterFace })(
  Navigation
);
