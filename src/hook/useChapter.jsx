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
        console.log('Pages Response:', pagesResponse.data);  // Loguear la respuesta
        const { baseUrl: imageBaseUrl, chapter } = pagesResponse.data;

        // Verifica si baseUrl y chapter están presentes en la respuesta
        if (imageBaseUrl && chapter && chapter.data) {
          const imageUrls = chapter.data.map((filename) => {
            // Verifica si `filename` y `chapter.hash` son válidos antes de crear la URL
            if (filename && chapter.hash) {
              // Utiliza la URL correcta para la imagen sin agregar el proxy
              return `${imageBaseUrl}/data/${chapter.hash}/${filename}`;
            } else {
              console.error(`Invalid filename or chapter hash: ${filename}, ${chapter.hash}`);
              return null;
            }
          }).filter(url => url !== null); // Filtra URLs inválidas

          if (imageUrls.length > 0) {
            setPages(imageUrls);
          } else {
            throw new Error('No valid image URLs found');
          }
        } else {
          throw new Error('No images available or incorrect response format');
        }
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
