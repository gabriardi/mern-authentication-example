import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './NavItem.module.scss';

const NavItem = ({ children, to, onClick }) => {
  return (
    <div>
      <NavLink
        onClick={onClick}
        activeClassName={styles.navItemActive}
        className={styles.navItem}
        to={to}
      >
        {children}
      </NavLink>
    </div>
  );
};

export default NavItem;
