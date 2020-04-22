import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

import reducers from './reducers';

const middlewares = [thunk];

const store = createStore(
  reducers,
  compose(
    applyMiddleware(...middlewares),
    (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()) ||
      compose
  )
);

const persistor = persistStore(store);

export { store, persistor };
