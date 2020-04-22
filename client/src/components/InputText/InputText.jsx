import React from 'react';

import styles from './InputText.module.scss';

const InputText = ({
  id,
  name,
  type,
  placeholder,
  onChange,
  value,
  minlength,
  pattern,
  validationMessage,
}) => {
  return (
    <>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        className={styles.InputText}
        onChange={onChange}
        value={value}
        minLength={minlength}
        pattern={pattern}
        required
      />
      <label className={styles.label} htmlFor={id}>
        {validationMessage}
      </label>
    </>
  );
};

export default InputText;
