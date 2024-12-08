import React from 'react';
import { useParams } from 'react-router-dom';
import useChapter from '../hook/useChapter';

/**
 * Chapter component that displays a manga chapter with navigation.
 * @component
 * @returns {JSX.Element} The Chapter component.
 */
const Chapter = () => {
  const { chapterId } = useParams();
  const {
    pages,
    loading,
    error,
    currentPage,
    setCurrentPage,
    chapterTitle,
    mangaTitle,
  } = useChapter(chapterId);

  /**
   * Navigates to the next page.
   * @function
   */
  const goToNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  /**
   * Navigates to the previous page.
   * @function
   */
  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (pages.length === 0) {
    return <div className="no-pages">No pages available for this chapter.</div>;
  }

  return (
    <div className="chapter-container">
      <h1 className="chapter-title">{chapterTitle || mangaTitle}</h1>
      <div className="chapter-page-container">
        <img
          src={pages[currentPage]}
          alt={`Page ${currentPage + 1}`}
          className="chapter-page"
        />
      </div>
      <div className="navigation-buttons">
        <button
          className="nav-button prev"
          onClick={goToPreviousPage}
          disabled={currentPage === 0}
        >
          ←
        </button>
        <button
          className="nav-button next"
          onClick={goToNextPage}
          disabled={currentPage === pages.length - 1}
        >
          →
        </button>
      </div>
    </div>
  );
};

export default Chapter;