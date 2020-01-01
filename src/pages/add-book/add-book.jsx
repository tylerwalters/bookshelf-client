import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import Page from '../../components/page/page';
import Search from '../../components/search/search';
import BookGrid from '../../components/book-grid/book-grid';
import Message from '../../components/message/message';
import Pagination from '../../components/pagination/pagination';
import Button from '../../components/button/button';

import useBooks from '../../shared/hooks/use-books';
import useGoogleBookSearch from '../../shared/hooks/use-google-book-search';

import { BOOKS_PER_PAGE } from '../../shared/constants/preferences';

import styles from './add-book.module.css';

function AddBook() {
  const [localQuery, setLocalQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const timeoutRef = useRef(null);

  const { addBook } = useBooks();
  const {
    searchedBooks: books,
    searchedBooksCount: count,
    setQuery,
    setSkip
  } = useGoogleBookSearch();

  const bookRangeStart = BOOKS_PER_PAGE * (currentPage - 1) + 1;
  const bookRangeEnd = BOOKS_PER_PAGE * (currentPage - 1) + 12;

  function getMessage() {
    let message = 'Enter a query in the search bar to find books.';

    if (Array.isArray(books)) {
      if (books.length === 0) {
        message = 'No books found for the entered query.';
      } else {
        message = `${count} books found. Displaying books ${bookRangeStart} - ${
          bookRangeEnd > count ? count : bookRangeEnd
        }.`;
      }
    }

    return message;
  }

  useEffect(() => {
    if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null;
      setQuery(localQuery);
    }, 500);
  }, [localQuery]);

  return (
    <Page>
      <div className={styles.heading}>
        <h1 className="typl8-beta">Add Book</h1>

        <Link to="/manual-book">
          <Button outline>Add Book Manually</Button>
        </Link>
      </div>

      <div className={styles.search}>
        <Search onChange={setLocalQuery} onBlur={setQuery} />
      </div>

      <div className={styles.message}>
        <Message message={getMessage()} variant="info" />
      </div>

      <BookGrid books={books} addBook={addBook} />

      <div className={styles.pagination}>
        <Pagination
          totalCount={count}
          currentPage={currentPage}
          onClick={page => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setCurrentPage(page);
            setSkip((page - 1) * BOOKS_PER_PAGE);
          }}
        />
      </div>
    </Page>
  );
}

export default AddBook;
