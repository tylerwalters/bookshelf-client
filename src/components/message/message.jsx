import React from 'react';
import PropTypes from 'prop-types';

import styles from './message.module.css';

function Message({ message, variant = '' }) {
  return (
    <div className={`${styles.message} ${styles[variant]}`}>{message}</div>
  );
}

Message.propTypes = {
  message: PropTypes.string,
  variant: PropTypes.oneOf(['success', 'error', 'info', 'warning'])
};

export default Message;
