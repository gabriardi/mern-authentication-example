import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Logo.module.scss';

const Logo = ({ logo }) => {
  return (
    <Link to="/">
      <h1 className={styles.Logo}>{logo}</h1>
    </Link>
  );
};

export default Logo;
