import { useState } from 'react';

/**
 * Custom hook to manage tag filters for manga.
 * @function
 * @returns {Object} The tag filters and related functions.
 */
const useTagFilters = () => {
  const allTags = ['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Romance', 'Mystery', 'Sci-Fi', 'Slice of Life']; // List of all available tags

  const [includedTags, setIncludedTags] = useState([]); // State to manage included tags
  const [excludedTags, setExcludedTags] = useState([]); // State to manage excluded tags

  /**
   * Adds a tag to the included or excluded list.
   * @param {string} tag - The tag to be added.
   * @param {boolean} isIncluded - Whether the tag is to be included or excluded.
   */
  const addTag = (tag, isIncluded) => {
    if (isIncluded) {
      if (!excludedTags.includes(tag) && !includedTags.includes(tag)) {
        setIncludedTags(prev => [...prev, tag]); // Add to included tags if not already present
      }
    } else {
      if (!includedTags.includes(tag) && !excludedTags.includes(tag)) {
        setExcludedTags(prev => [...prev, tag]); // Add to excluded tags if not already present
      }
    }
  };

  /**
   * Removes a tag from the included or excluded list.
   * @param {string} tag - The tag to be removed.
   * @param {boolean} isIncluded - Whether the tag is to be removed from the included or excluded list.
   */
  const removeTag = (tag, isIncluded) => {
    if (isIncluded) {
      setIncludedTags(prev => prev.filter(t => t !== tag)); // Remove from included tags
    } else {
      setExcludedTags(prev => prev.filter(t => t !== tag)); // Remove from excluded tags
    }
  };

  return {
    allTags, // List of all available tags
    includedTags, // List of included tags
    excludedTags, // List of excluded tags
    addTag, // Function to add a tag
    removeTag // Function to remove a tag
  };
};

export default useTagFilters;