import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { BOOKS_PER_PAGE } from '../../shared/constants/preferences';

import styles from './pagination.module.css';

function Pagination({ totalCount, currentPage, onClick }) {
  const pageCount = Math.ceil(Number(totalCount) / BOOKS_PER_PAGE);

  if (!pageCount) return null;

  const numberOfPagesToShow = pageCount > 10 ? 5 : pageCount;
  const displayPageStart = pageCount > 10 ? currentPage - 2 : 1;
  const emptyArr = Array.apply(null, Array(numberOfPagesToShow));
  const pageNumberArr = emptyArr
    .map((_, i) => displayPageStart + i)
    .filter(page => page <= pageCount && page > 0);

  return (
    <div className={styles.pagination}>
      {pageCount <= 10 &&
        pageNumberArr.map(page => (
          <span
            className={`${styles['page-number']} ${
              page === currentPage ? styles['current-page'] : ''
            }`}
            onClick={page === currentPage ? null : () => onClick(page)}
          >
            {page}
          </span>
        ))}

      {pageCount > 10 && (
        <>
          {pageNumberArr[0] !== 1 && (
            <>
              <span
                className={styles['page-number']}
                onClick={() => onClick(1)}
              >
                <FontAwesomeIcon icon="angle-double-left" />
              </span>
              <span
                className={styles['page-number']}
                onClick={() => onClick(currentPage - 1)}
              >
                <FontAwesomeIcon icon="angle-left" />
              </span>
            </>
          )}

          {pageNumberArr.map(page => (
            <span
              className={`${styles['page-number']} ${
                page === currentPage ? styles['current-page'] : ''
              }`}
              onClick={() => onClick(page)}
            >
              {page}
            </span>
          ))}

          {currentPage < pageCount && (
            <>
              <span
                className={styles['page-number']}
                onClick={() => onClick(currentPage + 1)}
              >
                <FontAwesomeIcon icon="angle-right" />
              </span>
              <span
                className={styles['page-number']}
                onClick={() => onClick(pageCount)}
              >
                <FontAwesomeIcon icon="angle-double-right" />
              </span>
            </>
          )}
        </>
      )}
    </div>
  );
}

Pagination.propTypes = {
  totalCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  handleClick: PropTypes.func
};

export default Pagination;
