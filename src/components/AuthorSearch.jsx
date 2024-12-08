import React, { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * AuthorSearch component that allows users to search for authors and select from suggestions.
 * @component
 * @param {Object} props - The props object.
 * @param {string} props.author - The current author search query.
 * @param {Function} props.setAuthor - Function to update the author search query.
 * @param {Function} props.setAuthorUUID - Function to set the selected author's UUID.
 * @param {Function} props.updateUrlParams - Function to update the URL parameters.
 * @returns {JSX.Element} The AuthorSearch component.
 */
const AuthorSearch = ({ author, setAuthor, setAuthorUUID, updateUrlParams }) => {
  const [authorSuggestions, setAuthorSuggestions] = useState([]);

  /**
   * Handles the search for authors based on the input name.
   * @async
   * @function
   * @param {string} name - The name of the author to search for.
   */
  const searchAuthors = async (name) => {
    if (name) {
      try {
        const response = await axios.get('https://api.mangadex.org/author', {
          params: { limit: 5, name },
        });
        const suggestions = response.data.data.map((author) => ({
          uuid: author.id,
          name: author.attributes.name,
        }));
        setAuthorSuggestions(suggestions);
        if (suggestions.length === 0) {
          setAuthorUUID(null); // Clear the UUID if no results
        }
      } catch (error) {
        console.error('Error fetching authors:', error);
      }
    } else {
      setAuthorSuggestions([]);
      setAuthorUUID(null); // Clear the UUID if the search field is empty
    }
  };

  useEffect(() => {
    // Search for authors only when the author field value changes
    searchAuthors(author);
  }, [author]);

  return (
    <div className="author-search-wrapper">
      <input
        type="text"
        placeholder="Search by Author"
        value={author}
        onChange={(e) => {
          setAuthor(e.target.value); // Update the author state
        }}
      />
      {authorSuggestions.length > 0 && (
        <ul className="author-suggestions">
          {authorSuggestions.map((author) => (
            <li
              key={author.uuid}
              onClick={() => {
                setAuthorUUID(author.uuid);
                setAuthor(author.name);
                updateUrlParams();
                setAuthorSuggestions([]); // Clear suggestions after selecting an author
              }}
            >
              {author.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AuthorSearch;