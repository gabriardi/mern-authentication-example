import React from 'react';

import styles from './Footer.module.scss';

const Footer = () => {
  const currentYear = new Date().getUTCFullYear();
  return (
    <p className={styles.footer}>
      &copy; Copyright {currentYear}. Built and designed by{' '}
      <a href="/">
        <button type="button" className={styles.footerBtnLink}>
          Gabriele Ardizzone
        </button>
      </a>
    </p>
  );
};

export default Footer;
