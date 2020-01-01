import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import Button from '../button/button';

import styles from './navigation.module.css';

function Navigation({ location }) {
  const { pathname } = location;

  return (
    <nav className={styles.nav}>
      {pathname !== '/' && (
        <Link to="/">
          <Button outline>Books</Button>
        </Link>
      )}
      {pathname !== '/add-book' && (
        <Link to="/add-book">
          <Button outline>Add Book</Button>
        </Link>
      )}
    </nav>
  );
}

export default withRouter(Navigation);
