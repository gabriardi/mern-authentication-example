import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter as Router } from 'react-router-dom';

import { store, persistor } from './redux/store';

import Layout from './layout/Layout';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router>
          <Layout />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
