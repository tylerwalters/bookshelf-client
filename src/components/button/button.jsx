import React from 'react';

import styles from './button.module.css';

function Button({
  children,
  onClick,
  outline = false,
  clear = false,
  ...rest
}) {
  return (
    <button
      onClick={onClick}
      className={`button ${outline ? 'button-outline' : ''} ${
        clear ? 'button-clear' : ''
      }`}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
