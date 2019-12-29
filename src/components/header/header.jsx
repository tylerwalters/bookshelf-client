import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Navigation from '../navigation/navigation';

import styles from './header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <FontAwesomeIcon icon="book-dead" className={styles.icon} />
        <span className={styles.text}>Bookshelf</span>
      </div>
      <Navigation />
    </header>
  );
}

export default Header;
