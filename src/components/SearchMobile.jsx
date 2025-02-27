import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

/**
 * SearchMobile component that allows users to search for manga.
 * @component
 * @param {Object} props - The props object.
 * @param {Function} props.onSearchResults - Function to handle the search results.
 * @returns {JSX.Element} The SearchMobile component.
 */
const SearchMobile = ({ onSearchResults }) => {
  const [query, setQuery] = useState(''); // State to manage the search query
  const [loading, setLoading] = useState(false); // State to manage the loading state
  const [results, setResults] = useState([]); // State to manage the search results
  const [error, setError] = useState(null); // State to manage any errors
  const navigate = useNavigate(); // Hook to navigate programmatically

  /**
   * Handles the change event on the search input.
   * @param {Object} event - The event object.
   */
  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  /**
   * Fetches search results from the API based on the query.
   * @async
   * @function
   * @param {string} query - The search query.
   */
  const fetchResults = async (query) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get('https://shibuya-station-1.onrender.com/api/manga', {
        params: {
          title: query,
          limit: 5,
        },
      });

      if (!response.data || !response.data.data) {
        throw new Error('No data received from the API');
      }

      const newResults = response.data.data || [];
      if (newResults.length === 0) {
        setError('No results found');
        setResults([]);
        onSearchResults([]);
        return;
      }

      const formattedResults = newResults.map((manga) => {
        const cover = manga.relationships.find((rel) => rel.type === 'cover_art');
        const coverUrl = cover && cover.attributes
          ? `https://shibuya-station-1.onrender.com/api2/covers/${manga.id}/${cover.attributes.file_name}`
          : null;

        const title = manga.attributes.title.en || manga.attributes.title.ja || 'No title available';

        return {
          id: manga.id,
          title,
          cover_url: coverUrl,
        };
      });

      setResults(formattedResults);
      onSearchResults(formattedResults);

    } catch (error) {
      setError(`An error occurred: ${error.response?.data?.message || error.message}`);
      console.error('Error fetching manga data:', error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      onSearchResults([]);
      return;
    }

    const timer = setTimeout(() => {
      fetchResults(query);
    }, 500);

    return () => clearTimeout(timer); 
  }, [query, onSearchResults]);

  /**
   * Handles the click event on a search result.
   * @param {string} mangaId - The ID of the selected manga.
   */
  const handleResultClick = (mangaId) => {
    navigate(`/manga/${mangaId}`);
    setQuery('');
  };

  return (
    <section className="search-mobile-container">
      <form className="search-mobile">
        <FaSearch className="search-mobile__icon" />
        <input
          type="text"
          placeholder="Search Manga..."
          value={query}
          onChange={handleChange}
          className="search-mobile__input"
        />
      </form>

      {query && (
        <section className="search-mobile-results">
          {loading ? (
            <p>Searching...</p>
          ) : error ? (
            <p>{error}</p>
          ) : results.length > 0 ? (
            results.map((manga) => (
              <article
                key={manga.id}
                className="search-mobile-result-item"
                onClick={() => handleResultClick(manga.id)} 
              >
                {manga.cover_url && (
                  <img
                    src={manga.cover_url}
                    alt={manga.title}
                    className="search-mobile-result-cover"
                  />
                )}
                <span>{manga.title}</span>
              </article>
            ))
          ) : (
            <p>No results found</p>
          )}
        </section>
      )}
    </section>
  );
};

export default SearchMobile;