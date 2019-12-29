import React from 'react';
import PropTypes from 'prop-types';

import styles from './thumbnail.module.css';

function Thumbnail({ url, alt }) {
  return <img src={url} alt={alt} className={styles.thumbnail} />;
}

Thumbnail.propTypes = {
  url: PropTypes.string,
  alt: PropTypes.string
};

export default Thumbnail;
