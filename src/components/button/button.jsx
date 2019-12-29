import React from 'react';

import styles from './button.module.css';

function Button({ children, onClick }) {
  return (
    <button onClick={onClick} className="button button-outline">
      {children}
    </button>
  );
}

export default Button;
