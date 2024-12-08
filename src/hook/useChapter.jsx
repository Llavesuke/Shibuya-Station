import { useEffect, useState } from 'react';
import axios from 'axios';

const useChapter = (chapterId) => {
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