import React from 'react';

import styles from './text.module.css';

function Text({ label, name, type = 'text', onChange, onBlur }) {
  return (
    <label className={styles.container}>
      <span className={styles.label}>{label}</span>
      <input
        className={styles.text}
        type={type}
        name={name}
        onChange={e => onChange && onChange(e.target.value)}
        onBlur={e => onBlur && onBlur(e.target.value)}
      />
    </label>
  );
}

export default Text;
