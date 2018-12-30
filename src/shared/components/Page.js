import React from 'react';

import Header from '../../header/Header';
import Navigation from '../../navigation/Navigation';

const Page = ({ children }) => (
  <div className="page">
    <Header />

    <main className="main-content">{children}</main>

    <Navigation />
  </div>
);

export default Page;
