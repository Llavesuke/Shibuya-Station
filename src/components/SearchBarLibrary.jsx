import React from 'react';
import PropTypes from 'prop-types';

/**
 * SearchBarLibrary component that allows users to search for manga in the library.
 * @component
 * @param {Object} props - The props object.
 * @param {string} props.query - The current search query.
 * @param {Function} props.setQuery - Function to update the search query.
 * @param {Function} props.handleSearch - Function to handle the search action.
 * @returns {JSX.Element} The SearchBarLibrary component.
 */
const SearchBarLibrary = ({ query, setQuery, handleSearch }) => (
  <div className="search-bar-wrapper">
    <input
      type="text"
      placeholder="Search Manga..."
      value={query}
      onChange={(e) => setQuery(e.target.value)} // Updates the search query state
    />
    <button onClick={handleSearch}>Search</button> {/* Triggers the search action */}
  </div>
);

// PropTypes validation to ensure correct usage
SearchBarLibrary.propTypes = {
  query: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
};

export default SearchBarLibrary;