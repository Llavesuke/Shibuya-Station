import React from 'react';
import PropTypes from 'prop-types';

/**
 * Pagination component for navigating through pages.
 * @component
 * @param {Object} props - The props object.
 * @param {number} props.currentPage - The current page number.
 * @param {number} props.totalMangas - The total number of mangas.
 * @param {number} props.mangasPerPage - The number of mangas displayed per page.
 * @param {Function} props.nextPage - Function to go to the next page.
 * @param {Function} props.prevPage - Function to go to the previous page.
 * @returns {JSX.Element} The Pagination component.
 */
const Pagination = ({ currentPage, totalMangas, mangasPerPage, nextPage, prevPage }) => (
  <nav className="pagination">
    <button className="pagination__button pagination__button--prev" onClick={prevPage} disabled={currentPage === 1}>
      Previous
    </button>
    <span className="pagination__info">
      Page {currentPage} of {Math.ceil(totalMangas / mangasPerPage)}
    </span>
    <button className="pagination__button pagination__button--next" onClick={nextPage} disabled={currentPage === Math.ceil(totalMangas / mangasPerPage)}>
      Next
    </button>
  </nav>
);

// PropTypes validation to ensure correct usage
Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalMangas: PropTypes.number.isRequired,
  mangasPerPage: PropTypes.number.isRequired,
  nextPage: PropTypes.func.isRequired,
  prevPage: PropTypes.func.isRequired,
};

export default Pagination;