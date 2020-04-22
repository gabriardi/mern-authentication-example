/* eslint-disable no-shadow */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import styles from './Layout.module.scss';

import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import LoginRegister from '../../pages/LoginRegister/LoginRegister';
import Dashboard from '../../pages/Dashboard';

const Layout = ({ isAuthenticated }) => {
  return (
    <div className={styles.Layout}>
      <Navigation />
      <main>
        <Switch>
          <Route path="/">
            {isAuthenticated ? <Dashboard /> : <LoginRegister />}
          </Route>
        </Switch>
      </main>
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Layout);
