import React, { useState, useEffect, useRef } from 'react';

import Page from '../../components/page/page';
import Pagination from '../../components/pagination/pagination';
import Search from '../../components/search/search';
import Radio from '../../components/radio/radio';
import BookList from '../../components/book-list/book-list';
import BookGrid from '../../components/book-grid/book-grid';
import Message from '../../components/message/message';

import useBooks from '../../shared/hooks/use-books';

import { BOOKS_PER_PAGE } from '../../shared/constants/preferences';

import styles from './home.module.css';

function Home() {
  const [localQuery, setLocalQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [layout, setLayout] = useState('grid');
  const timeoutRef = useRef(null);

  const { books, count, fetchBooks, setQuery, setSearchBy, setSkip } = useBooks(
    {}
  );

  const bookRangeStart = BOOKS_PER_PAGE * (currentPage - 1) + 1;
  const bookRangeEnd = BOOKS_PER_PAGE * (currentPage - 1) + 12;

  useEffect(() => {
    if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null;
      setQuery(localQuery);
    }, 500);
  }, [localQuery]);

  useEffect(() => fetchBooks(), []);

  return (
    <Page>
      <h1 className="typl8-beta">Our Books</h1>

      <div className={styles.search}>
        <Search onChange={setLocalQuery} onBlur={setQuery} />
      </div>

      <div className={styles.radios}>
        <Radio
          type="radio"
          name="searchBy"
          value="author"
          label="author"
          defaultChecked
          onClick={setSearchBy}
        />
        <Radio
          type="radio"
          name="searchBy"
          value="title"
          label="title"
          onClick={setSearchBy}
        />
      </div>

      {books && (
        <Message
          message={`${count} books found. Displaying books ${bookRangeStart} - ${
            bookRangeEnd > count ? count : bookRangeEnd
          }.`}
          variant="info"
        />
      )}

      {layout === 'list' ? (
        <BookList books={books} />
      ) : (
        <BookGrid books={books} />
      )}

      <div className={styles.pagination}>
        <Pagination
          totalCount={count}
          currentPage={currentPage}
          onClick={page => {
            setCurrentPage(page);
            setSkip((page - 1) * BOOKS_PER_PAGE);
          }}
        />
      </div>
    </Page>
  );
}

export default Home;
