import { useState, useEffect } from 'react';
import axios from 'axios';

const baseUrl = 'https://shibuya-station-1.onrender.com/api';
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

  /**
   * Extracts filter parameters from the URL.
   * @returns {Object} The filter parameters.
   */
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
      const resp = await axios.get(`${baseUrl}/manga`, { params: filters });
      setMangas(resp.data.data || []);
      setTotalMangas(resp.data.total || 0);
    } catch (error) {
      console.error('Error fetching mangas:', error);
    }
  };

  /**
   * Fetches UUIDs for the given tag names.
   * @async
   * @function
   * @param {string[]} tagNames - The names of the tags to fetch UUIDs for.
   * @returns {Promise<string[]>} The UUIDs of the tags.
   */
  const fetchTagUUIDs = async (tagNames) => {
    try {
      const response = await axios.get(`${baseUrl}/manga/tag`);
      const tagsData = response.data.data;

      return tagNames.map((tagName) => {
        const tag = tagsData.find((t) => t.attributes.name.en === tagName);
        return tag ? tag.id : null;
      }).filter((id) => id); // Filter out nulls if the tag is not found
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