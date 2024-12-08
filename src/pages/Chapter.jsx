import React from 'react';
import { useParams } from 'react-router-dom';
import useChapter from '../hook/useChapter';

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

  const goToNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (pages.length === 0) {
    return <div className="no-pages">No hay páginas disponibles para este capítulo.</div>;
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