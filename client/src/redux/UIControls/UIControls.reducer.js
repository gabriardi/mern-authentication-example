import { SHOW_REGISTER_FACE } from './UIControls.types';

const initialState = { showRegisterFace: false };

const UIControlsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_REGISTER_FACE:
      return { ...state, showRegisterFace: action.payload };

    default:
      return state;
  }
};

export default UIControlsReducer;
