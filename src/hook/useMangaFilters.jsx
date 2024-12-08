import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Custom hook for managing manga filters and fetching mangas.
 * @function
 * @param {Object} location - The location object from react-router.
 * @param {number} currentPage - The current page number.
 * @param {Function} setMangas - Function to set the mangas state.
 * @param {Function} setTotalMangas - Function to set the total mangas state.
 * @returns {Object} The filter states and fetchMangas function.
 */
const useMangaFilters = (location, currentPage, setMangas, setTotalMangas) => {
  const [query, setQuery] = useState('');
  const [authorUUID, setAuthorUUID] = useState('');
  const [status, setStatus] = useState('');
  const [includedTags, setIncludedTags] = useState([]);
  const [excludedTags, setExcludedTags] = useState([]);
  const [demographic, setDemographic] = useState('');
  const [contentRating, setContentRating] = useState('');
  const [sortOrder, setSortOrder] = useState({ rating: 'desc', followedCount: 'desc' });

  const mangasPerPage = 15;
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/'; // Define the proxy URL

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
      const response = await axios.get(`${proxyUrl}https://api.mangadex.org/tag`);
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
      const response = await axios.get(`${proxyUrl}https://api.mangadex.org/manga`, { params: filters });
      const mangas = response.data.data;
      setMangas(mangas);
      setTotalMangas(response.data.total);
    } catch (error) {
      console.error('Error fetching mangas:', error);
    }
  };

  /**
   * Retrieves filter parameters from the URL.
   * @function
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

  return {
    query, setQuery, authorUUID, setAuthorUUID, status, setStatus,
    includedTags, setIncludedTags, excludedTags, setExcludedTags,
    demographic, setDemographic, contentRating, setContentRating,
    sortOrder, setSortOrder, fetchMangas
  };
};

export default useMangaFilters;