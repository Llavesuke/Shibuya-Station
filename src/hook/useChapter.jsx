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

  useEffect(() => {
    const fetchChapterDetails = async () => {
      try {
        // Fetch chapter details
        const chapterResponse = await axios.get(`https://api.mangadex.org/chapter/${chapterId}`);
        const chapterData = chapterResponse.data.data;
        const title = chapterData.attributes.title || null;
        setChapterTitle(title);

        // Fetch related manga title
        const mangaId = chapterData.relationships.find((rel) => rel.type === 'manga')?.id;
        if (mangaId) {
          const mangaResponse = await axios.get(`https://api.mangadex.org/manga/${mangaId}`);
          const mangaData = mangaResponse.data.data;
          setMangaTitle(mangaData.attributes.title.en || 'Unknown Title');
        }

        // Fetch chapter pages
        const pagesResponse = await axios.get(`https://api.mangadex.org/at-home/server/${chapterId}`);
        const { baseUrl, chapter } = pagesResponse.data;
        const imageUrls = chapter.data.map(
          (filename) => `${baseUrl}/data/${chapter.hash}/${filename}`
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