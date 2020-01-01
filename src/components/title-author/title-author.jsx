import React from 'react';
import PropTypes from 'prop-types';

import styles from './title-author.module.css';

function TitleAuthor({ title, author }) {
  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
      {author && <div className={styles.author}>by {author}</div>}
    </div>
  );
}

TitleAuthor.propTypes = {
  title: PropTypes.string,
  author: PropTypes.string
};

export default TitleAuthor;
