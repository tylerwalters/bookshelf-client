import React from 'react';
import PropTypes from 'prop-types';

import Thumbnail from '../thumbnail/thumbnail';
import TitleAuthor from '../title-author/title-author';

import styles from './book-grid.module.css';

function BookGrid({ books }) {
  if (!books) return null;

  return (
    <div className={styles.grid}>
      {books.map(book => (
        <div className={styles.node} key={book.id}>
          {book.imageLinks && book.imageLinks.thumbnail && (
            <Thumbnail url={book.imageLinks.thumbnail} alt={book.title} />
          )}
          <TitleAuthor title={book.title} author={book.authors.join(', ')} />
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
  )
};

export default BookGrid;
