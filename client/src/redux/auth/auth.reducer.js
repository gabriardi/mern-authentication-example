import { SET_CURRENT_USER, SET_AUTH_TOKENS } from './auth.types';

const isObjEmpty = (obj) => {
  if (Object.keys(obj).length) {
    return true;
  }
  return false;
};

const initialState = {
  authTokens: {
    accessToken: null,
    refreshToken: null,
  },
  user: {},
  isAuthenticated: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: isObjEmpty(action.payload),
      };
    case SET_AUTH_TOKENS:
      return {
        ...state,
        authTokens: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
