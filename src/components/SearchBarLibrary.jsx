import React from 'react';

const SearchBar = ({ query, setQuery, handleSearch }) => (
  <div className="search-bar-wrapper">
    <input
      type="text"
      placeholder="Search Manga..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
    <button onClick={handleSearch}>Search</button>
  </div>
);

export default SearchBar;
