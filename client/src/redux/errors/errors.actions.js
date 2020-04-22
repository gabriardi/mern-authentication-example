import { GET_ERRORS, CLEAR_ERRORS } from './errors.types';

export const getErrors = (errors) => ({
  type: GET_ERRORS,
  payload: errors,
});

export const clearErrors = () => ({ type: CLEAR_ERRORS });
