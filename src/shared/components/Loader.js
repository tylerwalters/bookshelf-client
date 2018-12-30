import React from 'react';

import './loader.css';

const Loader = ({ text, type = 'success' }) => (
  <div className="lds-grid">
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
  </div>
);

export default Loader;
