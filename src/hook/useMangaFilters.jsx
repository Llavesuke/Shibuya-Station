import { useState, useEffect } from 'react';
import axios from 'axios';

const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const baseUrl = 'https://api.mangadex.org';
const mangasPerPage = 15;

/**
 * Custom hook to manage manga filters and fetch manga data.
 * @function
 * @param {Object} location - The location object from react-router.
 * @param {number} currentPage - The current page number.
 * @param {Function} setMangas - Function to set the fetched mangas.
 * @param {Function} setTotalMangas - Function to set the total number of mangas.
 * @returns {Object} The manga filters and related functions.
 */
const useMangaFilters = (location, currentPage, setMangas, setTotalMangas) => {
  const [query, setQuery] = useState(''); // State to manage the search query
  const [authorUUID, setAuthorUUID] = useState(''); // State to manage the author UUID
  const [status, setStatus] = useState(''); // State to manage the status filter
  const [includedTags, setIncludedTags] = useState([]); // State to manage included tags
  const [excludedTags, setExcludedTags] = useState([]); // State to manage excluded tags
  const [demographic, setDemographic] = useState(''); // State to manage the demographic filter
  const [contentRating, setContentRating] = useState(''); // State to manage the content rating filter
  const [sortOrder, setSortOrder] = useState({ rating: 'desc', followedCount: 'desc' }); // State to manage the sort order
  const [authorSuggestions, setAuthorSuggestions] = useState([]); // State to manage author suggestions
  const [error, setError] = useState(null); // State to manage errors

  /**
   * Extracts filter parameters from the URL.
   * @returns {Object} The filter parameters.
   */
  const getParamsFromUrl = () => {
    const urlParams = new URLSearchParams(location.search);
    return {
      query: urlParams.get('query') || '',
      authorUUID: urlParams.get('authorUUID') || '',
      status: urlParams.get('status') || '',
      includedTags: urlParams.getAll('includedTags[]'),
      excludedTags: urlParams.getAll('excludedTags[]'),
      demographic: urlParams.get('demographic') || '',
      contentRating: urlParams.get('contentRating') || '',
      sortOrder: {
        rating: urlParams.get('order[rating]') || 'desc',
        followedCount: urlParams.get('order[followedCount]') || 'desc',
      },
    };
  };

  /**
   * Fetches tag UUIDs based on tag names.
   * @async
   * @function
   * @param {Array} tags - The list of tag names.
   * @returns {Array} The list of tag UUIDs.
   */
  const fetchTagUUIDs = async (tags) => {
    if (!tags || tags.length === 0) return [];
    try {
      const response = await axios.get(`${proxyUrl}${baseUrl}/tag`);
      const allTags = response.data.data;
      return tags.map(tag => {
        const foundTag = allTags.find(t => t.attributes.name.en === tag || t.attributes.name.ja === tag);
        return foundTag ? foundTag.id : null;
      }).filter(tag => tag !== null);
    } catch (error) {
      console.error('Error fetching tag UUIDs:', error);
      return [];
    }
  };

  /**
   * Fetches mangas based on the current filters.
   * @async
   * @function
   * @param {number} page - The page number to fetch.
   */
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
      const response = await axios.get(`${proxyUrl}${baseUrl}/manga`, { params: filters });
      const mangas = response.data.data;
      setMangas(mangas);
      setTotalMangas(response.data.total);
    } catch (error) {
      console.error('Error fetching mangas:', error);
      setError(error);
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
    error // Devuelve el error para manejarlo en el componente
  };
};

export default useMangaFilters;