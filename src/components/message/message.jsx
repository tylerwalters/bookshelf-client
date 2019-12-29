import React from 'react';
import PropTypes from 'prop-types';

function Message({ message, variant = '' }) {
  return <div className={`message ${variant}`}>{message}</div>;
}

Message.propTypes = {
  message: PropTypes.string,
  variant: PropTypes.oneOf(['success', 'error', 'info', 'warning'])
};

export default Message;
