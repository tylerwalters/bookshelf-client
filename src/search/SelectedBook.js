import React from 'react';

const SelectedBook = ({ book }) => (
  <div className="search-result">
    <img
      src={book.imageLinks && book.imageLinks.smallThumbnail}
      alt={book.title}
      className="image"
    />

    <div className="search-result-details">
      <span className="title">{book.title}</span>
      <span className="author">
        {book.authors.map((author, index) => {
          return `${author}${index === book.authors.length - 1 ? '' : ', '}`;
        })}
      </span>
    </div>

    <div className="status">{book.status}</div>
  </div>
);

export default SelectedBook;
