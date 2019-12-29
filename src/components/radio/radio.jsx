import React from 'react';

import styles from './radio.module.css';

function Radio({ name, value, label, defaultChecked = false, onClick }) {
  return (
    <label>
      <input
        className={styles.radio}
        type="radio"
        name={name}
        value={value}
        defaultChecked={defaultChecked}
        onClick={e => onClick(e.target.value)}
      />
      {label}
    </label>
  );
}

export default Radio;
