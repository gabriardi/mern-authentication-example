import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from './auth/auth.reducer';
import errorsReducer from './errors/errors.reducer';
import profilesReducer from './profiles/profiles.reducer';
import UIControlsReducer from './UIControls/UIControls.reducer';

const persistConfig = { key: ShadowRoot, storage, whitelist: ['auth'] };

const rootReducer = combineReducers({
  auth: authReducer,
  errors: errorsReducer,
  profiles: profilesReducer,
  UIControls: UIControlsReducer,
});

export default persistReducer(persistConfig, rootReducer);
