import axios from 'axios';
import jwtDecode from 'jwt-decode';

import { getErrors, clearErrors } from '../errors/errors.actions';
import { CLEAR_PROFILES_DATA } from '../profiles/profiles.types';

import { SET_CURRENT_USER, SET_AUTH_TOKENS } from './auth.types';

export const setCurrentUser = (user) => ({
  type: SET_CURRENT_USER,
  payload: user,
});

export const setAuthTokens = (authTokens) => ({
  type: SET_AUTH_TOKENS,
  payload: authTokens,
});

export const loginUser = (userData) => (dispatch) => {
  axios
    .post('/api/users/login', userData)
    .then((res) => {
      const { accessToken, refreshToken } = res.data;
      dispatch(setAuthTokens({ accessToken, refreshToken }));
      const decoded = jwtDecode(accessToken);
      dispatch(setCurrentUser(decoded));
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch(getErrors(err.response));
    });
};

export const logoutUser = () => (dispatch, state) => {
  const {
    auth: {
      authTokens: { refreshToken },
    },
  } = state();

  // DELETE refresh token from server
  axios
    .delete('/api/users/logout', { data: { token: refreshToken } })
    .catch((err) => {
      dispatch(getErrors(err.response));
    });

  // Set current user to empty
  dispatch(setCurrentUser({}));
  // Delete auth tokens from store
  dispatch(setAuthTokens({}));
  // Empty secret data
  dispatch({ type: CLEAR_PROFILES_DATA });
};

export const registerUser = (userData) => (dispatch) => {
  axios
    .post('/api/users/register', userData)
    .then(() => {
      const loginUserData = {
        email: userData.email,
        password: userData.password,
      };
      dispatch(loginUser(loginUserData));
    })
    .catch((err) => {
      dispatch(getErrors(err.response));
    });
};
