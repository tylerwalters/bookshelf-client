import React, { useState, useEffect, useRef } from 'react';

import Page from '../../components/page/page';
import Text from '../../components/text/text';
import Button from '../../components/button/button';

import useBooks from '../../shared/hooks/use-books';

function ManualBook() {
  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState('');

  const { addBook } = useBooks();

  function createAuthorsArray(val) {
    const authorsArr = val.split(',').map(author => author.trim());

    return authorsArr;
  }

  function handleSubmit() {
    if (title && authors) addBook({ title, authors });
  }

  return (
    <Page>
      <h1 className="typl8-beta">Add Book Manually</h1>

      <Text label="Title" name="title" onChange={setTitle} onBlur={setTitle} />

      <Text
        label="Author(s)"
        name="author"
        onChange={val => setAuthors(createAuthorsArray(val))}
        onBlur={val => setAuthors(createAuthorsArray(val))}
      />

      <Button onClick={handleSubmit} disabled={!title || !authors}>
        Submit
      </Button>
    </Page>
  );
}

export default ManualBook;
