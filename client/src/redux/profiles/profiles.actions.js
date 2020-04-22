import axios from 'axios';

import {
  SET_PROFILES_DATA,
  CLEAR_PROFILES_DATA,
  SET_IS_LOADING,
} from './profiles.types';

import { setAuthTokens } from '../auth/auth.actions';

export const setProfiles = (profiles) => ({
  type: SET_PROFILES_DATA,
  payload: profiles,
});

export const setIsLoading = (isLoading) => ({
  type: SET_IS_LOADING,
  payload: isLoading,
});

export const clearProfilesData = () => ({ type: CLEAR_PROFILES_DATA });

export const getProfilesFromServer = (page) => (dispatch, state) => {
  dispatch(setIsLoading(true));
  const {
    auth: {
      authTokens: { accessToken },
    },
    auth: {
      authTokens: { refreshToken },
    },
  } = state();

  const requestProfilesInstance = axios.create();

  requestProfilesInstance.interceptors.request.use(
    (config) => {
      // Set Authorization header to authenticate on the server
      const newConfig = config;
      newConfig.headers.common.Authorization = accessToken;
      return newConfig;
    },
    (error) => Promise.reject(error)
  );

  requestProfilesInstance.interceptors.response.use(
    (response) => {
      dispatch(setProfiles(response.data.results));
      dispatch(setIsLoading(false));
      return response;
    },
    (error) => {
      // If unauthorized refresh access token
      const originalRequest = error.config;
      if (
        error.response.status === 401 &&
        originalRequest.url === '/api/users/token'
      ) {
        return Promise.reject(error);
      }
      if (error.response.status === 401 && !originalRequest.retry) {
        originalRequest.retry = true;

        // Refresh access token request
        axios.post('/api/users/token', { token: refreshToken }).then((res) => {
          if (res.status === 201) {
            const newAccessToken = res.data.accessToken;
            originalRequest.headers.Authorization = newAccessToken;
            dispatch(
              setAuthTokens({ accessToken: newAccessToken, refreshToken })
            );
          }
          return requestProfilesInstance(originalRequest);
        });
      }
      return Promise.reject(error);
    }
  );
  const results = 12;
  requestProfilesInstance.get(`/api/dashboard?page=${page}&results=${results}`);
};
