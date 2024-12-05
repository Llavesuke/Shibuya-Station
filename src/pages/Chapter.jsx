import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Chapter = () => {
  const { chapterId } = useParams();
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [chapterTitle, setChapterTitle] = useState('');
  const [mangaTitle, setMangaTitle] = useState('');

  useEffect(() => {
    const fetchChapterDetails = async () => {
      try {
        // Obtener los detalles del capítulo
        const chapterResponse = await axios.get(`https://api.mangadex.org/chapter/${chapterId}`);
        const chapterData = chapterResponse.data.data;
        const title = chapterData.attributes.title || null;
        setChapterTitle(title);

        // Obtener el ID del manga relacionado
        const mangaId = chapterData.relationships.find((rel) => rel.type === 'manga')?.id;
        if (mangaId) {
          // Obtener el título del manga
          const mangaResponse = await axios.get(`https://api.mangadex.org/manga/${mangaId}`);
          const mangaData = mangaResponse.data.data;
          setMangaTitle(mangaData.attributes.title.en || 'Título desconocido');
        }

        // Obtener las páginas del capítulo
        const pagesResponse = await axios.get(`https://api.mangadex.org/at-home/server/${chapterId}`);
        const { baseUrl, chapter } = pagesResponse.data;
        const imageUrls = chapter.data.map(
          (filename) => `${baseUrl}/data/${chapter.hash}/${filename}`
        );

        setPages(imageUrls);
      } catch (err) {
        console.error('Error fetching chapter details or pages:', err);
        setError('No se pudo cargar el capítulo.');
      } finally {
        setLoading(false);
      }
    };

    fetchChapterDetails();
  }, [chapterId]);

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
