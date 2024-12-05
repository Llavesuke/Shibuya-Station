// useTagFilters.js
import { useState } from 'react';

const useTagFilters = () => {
  const allTags = ['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Romance', 'Mystery', 'Sci-Fi', 'Slice of Life'];

  const [includedTags, setIncludedTags] = useState([]); // Inicializado como un array vacío
  const [excludedTags, setExcludedTags] = useState([]); // Inicializado como un array vacío

  const addTag = (tag, isIncluded) => {
    if (isIncluded) {
      if (!excludedTags.includes(tag) && !includedTags.includes(tag)) {
        setIncludedTags(prev => [...prev, tag]);
      }
    } else {
      if (!includedTags.includes(tag) && !excludedTags.includes(tag)) {
        setExcludedTags(prev => [...prev, tag]);
      }
    }
  };

  const removeTag = (tag, isIncluded) => {
    if (isIncluded) {
      setIncludedTags(prev => prev.filter(t => t !== tag));
    } else {
      setExcludedTags(prev => prev.filter(t => t !== tag));
    }
  };

  return {
    allTags,
    includedTags, 
    excludedTags, 
    addTag, 
    removeTag
  };
};

export default useTagFilters;
