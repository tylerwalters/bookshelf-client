import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Thumbnail from '../thumbnail/thumbnail';
import TitleAuthor from '../title-author/title-author';
import Button from '../button/button';

import styles from './book-grid.module.css';

function BookGrid({ books, removeBook, addBook }) {
  if (!books) return null;

  return (
    <div className={styles.grid}>
      {books.map(book => (
        <div className={styles.node} key={book.id}>
          {removeBook && (
            <FontAwesomeIcon
              icon="trash-alt"
              className={styles.icon}
              onClick={() => removeBook(book.id)}
            />
          )}

          {book.imageLinks && book.imageLinks.thumbnail && (
            <Thumbnail url={book.imageLinks.thumbnail} alt={book.title} />
          )}
          <TitleAuthor
            title={book.title}
            author={
              Array.isArray(book.authors)
                ? book.authors.join(', ')
                : book.authors
            }
          />

          {addBook && <Button onClick={() => addBook(book)}>Add Book</Button>}
        </div>
      ))}
    </div>
  );
}

BookGrid.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      authors: PropTypes.arrayOf(PropTypes.string),
      imageLinks: PropTypes.shape({
        thumbnail: PropTypes.string
      })
    })
  ),
  removeBook: PropTypes.func
};

export default BookGrid;
