import { GET_ERRORS, CLEAR_ERRORS } from './errors.types';

const initialState = { response: { status: '' } };

const errorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ERRORS:
      return { response: action.payload };
    case CLEAR_ERRORS:
      return initialState;

    default:
      return state;
  }
};

export default errorsReducer;
