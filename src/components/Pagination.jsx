import React from 'react';

const Pagination = ({ currentPage, totalMangas, mangasPerPage, nextPage, prevPage }) => (
  <div className="library__pagination">
    <button onClick={prevPage} disabled={currentPage === 1}>
      Previous
    </button>
    <span>
      Page {currentPage} of {Math.ceil(totalMangas / mangasPerPage)}
    </span>
    <button onClick={nextPage} disabled={currentPage === Math.ceil(totalMangas / mangasPerPage)}>
      Next
    </button>
  </div>
);

export default Pagination;
