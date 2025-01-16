import { useEffect, useState } from 'react';
import axios from 'axios';

/**
 * Custom hook to fetch and manage chapter data.
 * @function
 * @param {string} chapterId - The ID of the chapter to fetch.
 * @returns {Object} The chapter data and related state management functions.
 */
const useChapter = (chapterId) => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [chapterTitle, setChapterTitle] = useState('');
  const [mangaTitle, setMangaTitle] = useState('');

  // URL del proxy en lugar de la API de MangaDex
  const baseUrl = 'https://shibuya-station-1.onrender.com/api';

  useEffect(() => {
    const fetchChapterDetails = async () => {
      try {
        // Obtener los detalles del capítulo a través del proxy
        const chapterResponse = await axios.get(`${baseUrl}/chapter/${chapterId}`);
        const chapterData = chapterResponse.data.data;
        const title = chapterData.attributes.title || null;
        setChapterTitle(title);

        // Obtener el título del manga relacionado
        const mangaId = chapterData.relationships.find((rel) => rel.type === 'manga')?.id;
        if (mangaId) {
          const mangaResponse = await axios.get(`${baseUrl}/manga/${mangaId}`);
          const mangaData = mangaResponse.data.data;
          setMangaTitle(mangaData.attributes.title.en || 'Unknown Title');
        }

        // Obtener las páginas del capítulo
        const pagesResponse = await axios.get(`${baseUrl}/at-home/server/${chapterId}`);
        const { baseUrl: imageBaseUrl, chapter } = pagesResponse.data;
        const imageUrls = chapter.data.map(
          (filename) => `${imageBaseUrl}/data/${chapter.hash}/${filename}`
        );

        setPages(imageUrls);
      } catch (err) {
        console.error('Error fetching chapter details or pages:', err);
        setError('Failed to load chapter.');
      } finally {
        setLoading(false);
      }
    };

    fetchChapterDetails();
  }, [chapterId, baseUrl]);

  return {
    pages,
    loading,
    error,
    currentPage,
    setCurrentPage,
    chapterTitle,
    mangaTitle,
  };
};

export default useChapter;
