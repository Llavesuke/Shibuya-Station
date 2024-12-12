import React from 'react';
import PropTypes from 'prop-types';
import { FaSearch } from 'react-icons/fa';

/**
 * SearchBarLibrary component for searching manga.
 * @param {Object} props - Component props.
 * @param {string} props.query - The current search query.
 * @param {Function} props.setQuery - Function to update the search query.
 * @param {Function} props.handleSearch - Function to handle the search action.
 * @returns {JSX.Element} The SearchBarLibrary component.
 */
const SearchBarLibrary = ({ query, setQuery, handleSearch }) => {
  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <section className="library-search-bar-container">
      <form className="library-search-bar" onSubmit={handleSearch}>
        <FaSearch className="library-search-icon" />
        <input
          type="text"
          placeholder="Search Manga..."
          value={query}
          onChange={handleChange}
          className="library-search-input"
        />
      </form>
    </section>
  );
};

// PropTypes validation to ensure correct usage
SearchBarLibrary.propTypes = {
  query: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired,
};

export default SearchBarLibrary;