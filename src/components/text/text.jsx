import React from 'react';

import styles from './text.module.css';

function Text({ label, name, type = 'text', onChange, onBlur }) {
  return (
    <input
      type={type}
      name={name}
      onChange={e => onChange && onChange(e.target.value)}
      onBlur={e => onBlur && onBlur(e.target.value)}
    />
  );
}

export default Text;
