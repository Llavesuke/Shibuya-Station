import { useState, useEffect } from 'react';
import axios from 'axios';

const baseUrl = 'https://api.mangadex.org';
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

  const fetchMangas = async (page) => {
    const { query, authorUUID, status, includedTags, excludedTags, demographic, contentRating, sortOrder } = getParamsFromUrl();
    const offset = (page - 1) * mangasPerPage;

    const includedTagUUIDs = await fetchTagUUIDs(includedTags);
    const excludedTagUUIDs = await fetchTagUUIDs(excludedTags);

    const filters = {
      title: query || undefined,
      authors: authorUUID ? [authorUUID] : undefined,
      'status[]': status ? [status] : undefined,
      'includedTags[]': includedTagUUIDs.length > 0 ? includedTagUUIDs : undefined,
      'excludedTags[]': excludedTagUUIDs.length > 0 ? excludedTagUUIDs : undefined,
      'publicationDemographic[]': demographic ? [demographic] : undefined,
      'contentRating[]': contentRating ? [contentRating] : undefined,
      limit: mangasPerPage,
      offset,
      'order[rating]': sortOrder.rating,
      'order[followedCount]': sortOrder.followedCount,
      includes: ['cover_art', 'author'],
    };

    try {
      const resp = await axios.get(`${baseUrl}/manga`, { params: filters });
      setMangas(resp.data.data || []);
      setTotalMangas(resp.data.total || 0);
    } catch (error) {
      console.error('Error fetching mangas:', error);
    }
  };

  const fetchTagUUIDs = async (tagNames) => {
    try {
      const response = await axios.get(`${baseUrl}/manga/tag`);
      const tagsData = response.data.data;

      return tagNames.map((tagName) => {
        const tag = tagsData.find((t) => t.attributes.name.en === tagName);
        return tag ? tag.id : null;
      }).filter((id) => id); // Filtrar nulls si no se encuentra el tag
    } catch (error) {
      console.error('Error fetching tags:', error);
      return [];
    }
  };

  useEffect(() => {
    fetchMangas(currentPage);
  }, [location]);

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
    fetchMangas
  };
};

export default useMangaFilters;
