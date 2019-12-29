import React from 'react';

import styles from './search.module.css';

function Search({ onChange, onBlur }) {
  return (
    <div className={styles.container}>
      <input
        className={styles.search}
        type="search"
        onChange={e => onChange && onChange(e.target.value)}
        onBlur={e => onBlur && onBlur(e.target.value)}
      />
    </div>
  );
}

export default Search;
