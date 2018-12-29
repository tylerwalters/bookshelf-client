import React from 'react';
import { Link } from 'react-router-dom';

import './header.css';

const Header = () => (
  <header>
    <span className="logo">Bookshelf</span>

    <nav>
      <Link to="/">Home</Link>
      <Link to="/add-books">Add Books</Link>
      <Link to="/about">About</Link>
    </nav>
  </header>
);

export default Header;
