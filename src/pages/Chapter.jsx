import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import useChapter from '../hook/useChapter';

/**
 * Chapter component that displays a manga chapter with navigation.
 * @component
 * @returns {JSX.Element} The Chapter component.
 */
const Chapter = () => {
  const [viewMode, setViewMode] = useState('single'); // 'single' or 'all'
  const { chapterId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { chapters } = location.state || { chapters: [] };
  const {
    pages,
    loading,
    error,
    currentPage,
    setCurrentPage,
    chapterTitle,
    mangaTitle,
  } = useChapter(chapterId);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(-1);

  const baseUrl = "https://shibuya-station-1.onrender.com/api"; // URL del proxy

  useEffect(() => {
    const index = chapters.findIndex(chapter => chapter.id === chapterId);
    setCurrentChapterIndex(index);
    setCurrentPage(0); // Reset the current page to the first page
    window.scrollTo(0, 0); // Reset the scroll to the top
  }, [chapterId, chapters, setCurrentPage]);

  const toggleViewMode = () => {
    setViewMode(viewMode === 'single' ? 'all' : 'single');
  };

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

  const goToPreviousChapter = () => {
    if (currentChapterIndex > 0) {
      const previousChapterId = chapters[currentChapterIndex - 1].id;
      navigate(`/chapter/${previousChapterId}`, { state: { chapters } });
    }
  };

  const goToNextChapter = () => {
    if (currentChapterIndex < chapters.length - 1) {
      const nextChapterId = chapters[currentChapterIndex + 1].id;
      navigate(`/chapter/${nextChapterId}`, { state: { chapters } });
    }
  };

  if (loading) {
    return <p className="chapter__loading">Loading...</p>;
  }

  if (error) {
    return <p className="chapter__error">{error}</p>;
  }

  if (pages.length === 0) {
    return <p className="chapter__no-pages">No pages available for this chapter.</p>;
  }

  return (
    <section className="chapter">
      <div className="chapter__header"> 
        <h1 className="chapter__title">{chapterTitle || mangaTitle}</h1>
        <button className="chapter__view-toggle" onClick={toggleViewMode}>
          📄
        </button>
      </div>
      {viewMode === 'single' ? (
        <article className="chapter__page-container">
          <img src={`${baseUrl}/pages/${pages[currentPage]}`} alt={`Page ${currentPage + 1}`} className="chapter__page" />
        </article>
      ) : (
        <article className="chapter__all-pages-container">
          {pages.map((page, index) => (
            <img key={index} src={`${baseUrl}/pages/${page}`} alt={`Page ${index + 1}`} className="chapter__page" />
          ))}
        </article>
      )}
      {viewMode === 'single' && (
        <nav className="chapter__navigation">
          <div className="chapter__page-navigation">
            <button
              className="chapter__page-nav-prev"
              onClick={goToPreviousPage}
              disabled={currentPage === 0}
            >
              ←
            </button>
            <button
              className="chapter__chapter-nav-prev"
              onClick={goToPreviousChapter}
              disabled={currentChapterIndex <= 0}
            >
              Previous Chapter
            </button>
            <button
              className="chapter__chapter-nav-next"
              onClick={goToNextChapter}
              disabled={currentChapterIndex >= chapters.length - 1}
            >
              Next Chapter
            </button>
            <button
              className="chapter__page-nav-next"
              onClick={goToNextPage}
              disabled={currentPage === pages.length - 1}
            >
              →
            </button>
          </div>
        </nav>
      )}
      {viewMode === 'all' && (
        <nav className="chapter__chapter-navigation">
          <button
            className="chapter__chapter-nav-prev"
            onClick={goToPreviousChapter}
            disabled={currentChapterIndex <= 0}
          >
            Previous Chapter
          </button>
          <button
            className="chapter__chapter-nav-next"
            onClick={goToNextChapter}
            disabled={currentChapterIndex >= chapters.length - 1}
          >
            Next Chapter
          </button>
        </nav>
      )}
    </section>
  );
};

export default Chapter;
