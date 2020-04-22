import { SHOW_REGISTER_FACE } from './UIControls.types';

export const setShowRegisterFace = (trueOrFalse) => ({
  type: SHOW_REGISTER_FACE,
  payload: trueOrFalse,
});
