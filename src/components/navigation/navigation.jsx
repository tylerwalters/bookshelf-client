import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import Button from '../button/button';

function Navigation({ location }) {
  const { pathname } = location;

  return (
    <nav>
      {pathname === '/add-book' && (
        <Link to="/">
          <Button outline>Books</Button>
        </Link>
      )}
      {pathname === '/' && (
        <Link to="/add-book">
          <Button outline>Add Book</Button>
        </Link>
      )}
    </nav>
  );
}

export default withRouter(Navigation);
