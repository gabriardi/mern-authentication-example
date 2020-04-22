import {
  SET_PROFILES_DATA,
  CLEAR_PROFILES_DATA,
  SET_IS_LOADING,
} from './profiles.types';

const initialState = { data: '', isLoading: false };

const profilesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROFILES_DATA:
      return { data: [...state.data, ...action.payload] };
    case CLEAR_PROFILES_DATA:
      return initialState;
    case SET_IS_LOADING:
      return { ...state, isLoading: action.payload };

    default:
      return state;
  }
};

export default profilesReducer;
