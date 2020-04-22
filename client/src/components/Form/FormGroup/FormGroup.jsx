import React from 'react';

import styles from './FormGroup.module.scss';

const FormGroup = ({ children, onSubmit, formId }) => {
  return (
    <form
      id={formId}
      method="POST"
      onSubmit={onSubmit}
      noValidate
      className={styles.FormGroup}
    >
      {children}
    </form>
  );
};

export default FormGroup;
