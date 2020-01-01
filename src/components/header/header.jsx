import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import Navigation from '../navigation/navigation';

import styles from './header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <Link to="/">
        <div className={styles.logo}>
          <FontAwesomeIcon icon="book-dead" className={styles.icon} />
          <span className={styles.text}>Bookshelf</span>
        </div>
      </Link>

      <Navigation />
    </header>
  );
}

export default Header;
