import React from 'react';

import IconButton from '@material-ui/core/IconButton';

const Pagination = ({ total, size, current, handleClick }) => {
  const pages = Math.ceil(total / size);
  const pageArr = Array.apply(null, { length: pages }).map(Number.call, Number);

  return (
    <div>
      {pageArr.map(page => {
        const value = page + 1;
        return (
          <IconButton
            onClick={() => handleClick(value)}
            key={`pagination-${value}`}
          >
            {value}
          </IconButton>
        );
      })}
    </div>
  );
};

export default Pagination;
