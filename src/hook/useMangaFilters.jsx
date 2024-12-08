import { useState, useEffect } from 'react';
import axios from 'axios';

const mangasPerPage = 15;

const useMangaFilters = (location, currentPage, setMangas, setTotalMangas) => {
  const [query, setQuery] = useState('');
  const [authorUUID, setAuthorUUID] = useState('');
  const [status, setStatus] = useState('');
  const [includedTags, setIncludedTags] = useState([]);
  const [excludedTags, setExcludedTags] = useState([]);
  const [demographic, setDemographic] = useState('');
  const [contentRating, setContentRating] = useState('');
  const [sortOrder, setSortOrder] = useState({ rating: 'desc', followedCount: 'desc' });
  const [authorSuggestions, setAuthorSuggestions] = useState([]);
  const [error, setError] = useState(null);

  const getParamsFromUrl = () => {
    const urlParams = new URLSearchParams(location.search);
    return {
      page: parseInt(urlParams.get('page'), 10) || 1,
      query: urlParams.get('query') || '',
      authorUUID: urlParams.get('authorUUID') || '',
      status: urlParams.get('status') || '',
      includedTags: urlParams.getAll('includedTags[]'),
      excludedTags: urlParams.getAll('excludedTags[]'),
      demographic: urlParams.get('demographic') || '',
      contentRating: urlParams.get('contentRating') || '',
      sortOrder: urlParams.get('sortOrder') || 'rating',
    };
  };

  const buildFilters = () => {
    const { query, authorUUID, status, includedTags, excludedTags, demographic, contentRating, sortOrder } = getParamsFromUrl();

    const filters = {
      title: query || undefined,
      authors: authorUUID ? [authorUUID] : undefined,
      'status[]': status || undefined,
      'includedTags[]': includedTags.length > 0 ? includedTags : undefined,
      'excludedTags[]': excludedTags.length > 0 ? excludedTags : undefined,
      'publicationDemographic[]': demographic || undefined,
      'contentRating[]': contentRating || undefined,
      limit: mangasPerPage,
      offset: (currentPage - 1) * mangasPerPage,
      'order[rating]': sortOrder.rating || undefined,
      'order[followedCount]': sortOrder.followedCount || undefined,
      includes: ['cover_art', 'author'],
    };

    // Elimina las propiedades con valores undefined o nulos
    Object.keys(filters).forEach((key) => filters[key] === undefined && delete filters[key]);

    return filters;
  };

  const fetchMangas = async (page) => {
    const filters = buildFilters();

    try {
      // Usar el endpoint de tu proxy CORS
      const resp = await axios.get('/api/mangaProxy', { params: { url: `https://api.mangadex.org/manga?${new URLSearchParams(filters).toString()}` } });
      setMangas(resp.data.data || []);
      setTotalMangas(resp.data.total || 0);
      setError(null);
    } catch (error) {
      console.error('Error fetching mangas:', error);
      setError('Failed to load manga data');
    }
  };

  const fetchTagUUIDs = async (tagNames) => {
    try {
      const response = await axios.get('/api/mangaProxy', { params: { url: 'https://api.mangadex.org/tags' } });
      const tagsData = response.data.data;

      return tagNames.map((tagName) => {
        const tag = tagsData.find((t) => t.attributes.name.en === tagName);
        return tag ? tag.id : null;
      }).filter((id) => id); // Filtramos los tags no encontrados
    } catch (error) {
      console.error('Error fetching tags:', error);
      return [];
    }
  };

  useEffect(() => {
    fetchMangas(currentPage);
  }, [currentPage, query, authorUUID, status, includedTags, excludedTags, demographic, contentRating, sortOrder]);

  return {
    query,
    setQuery,
    authorUUID,
    setAuthorUUID,
    status,
    setStatus,
    includedTags,
    setIncludedTags,
    excludedTags,
    setExcludedTags,
    demographic,
    setDemographic,
    contentRating,
    setContentRating,
    sortOrder,
    setSortOrder,
    authorSuggestions,
    setAuthorSuggestions,
    fetchMangas,
    error
  };
};

export default useMangaFilters;
