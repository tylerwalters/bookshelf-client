import React, { useState, useEffect, useRef } from 'react';

import Page from '../../components/page/page';
import Search from '../../components/search/search';

import styles from './add-book.module.css';

function AddBook() {
  const timeoutRef = useRef(null);

  return (
    <Page>
      <h1>Add Book</h1>
    </Page>
  );
}

export default AddBook;
