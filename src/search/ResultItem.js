import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addBook } from '../modules/search';

const ResultItem = ({ book, addBook }) => (
  <div className="search-result">
    {book.imageLinks && (
      <img
        src={book.imageLinks.smallThumbnail}
        alt={book.title}
        className="image"
      />
    )}

    <div className="search-result-details">
      <span className="title">{book.title}</span>
      {book.authors && (
        <span className="author">
          {book.authors.map((author, index) => {
            return `${author}${index === book.authors.length - 1 ? '' : ', '}`;
          })}
        </span>
      )}
    </div>

    <button className="action" onClick={addBook.bind(this, book)}>
      Add Book
    </button>
  </div>
);

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addBook
    },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(ResultItem);
