import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import Button from '../button/button';

function Navigation({ location }) {
  const { pathname } = location;

  return (
    <nav>
      {pathname === '/add-new-book' && (
        <Link to="/">
          <Button>Books</Button>
        </Link>
      )}
      {pathname === '/' && (
        <Link to="/add-book">
          <Button>Add Book</Button>
        </Link>
      )}
    </nav>
  );
}

export default withRouter(Navigation);
