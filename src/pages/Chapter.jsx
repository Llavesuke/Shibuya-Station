import React from 'react';
import { useParams } from 'react-router-dom';
import useChapter from '../hook/useChapter';

/**
 * Chapter component that displays the pages of a manga chapter.
 * @component
 * @returns {JSX.Element} The Chapter component.
 */
const Chapter = () => {
  const { chapterId } = useParams(); // Get the chapter ID from the URL parameters
  const {
    pages,
    loading,
    error,
    currentPage,
    chapterTitle,
    mangaTitle,
    goToNextPage,
    goToPreviousPage,
  } = useChapter(chapterId); // Use the custom hook to fetch chapter data

  if (loading) {
    return <div className="loading">Cargando...</div>; // Show loading message while data is being fetched
  }

  if (error) {
    return <div className="error">{error}</div>; // Show error message if there is an error
  }

  if (pages.length === 0) {
    return <div className="no-pages">No hay páginas disponibles para este capítulo.</div>; // Show message if no pages are available
  }

  return (
    <div className="chapter-container">
      <h1 className="chapter-title">{chapterTitle || mangaTitle}</h1>
      <div className="chapter-page-container">
        <img
          src={pages[currentPage]}
          alt={`Página ${currentPage + 1}`}
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