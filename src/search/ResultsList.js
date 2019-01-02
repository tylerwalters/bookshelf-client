import React from 'react';

import ResultItem from './ResultItem';

const ResultsList = ({ results, query }) => {
  if (results.length === 0) {
    if (query) {
      return `No results found for ${query}`;
    }
    return null;
  }

  return (
    <div className="results-list">
      {results.map(book => (
        <ResultItem book={book} key={book.id} />
      ))}
    </div>
  );
};

export default ResultsList;
