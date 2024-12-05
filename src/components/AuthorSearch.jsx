import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AuthorSearch = ({ author, setAuthor, setAuthorUUID, updateUrlParams }) => {
  const [authorSuggestions, setAuthorSuggestions] = useState([]);

  // Función para manejar la búsqueda de autores
  const searchAuthors = async (name) => {
    if (name) {
      try {
        const response = await axios.get('https://api.mangadex.org/author', {
          params: { limit: 5, name },
        });
        setAuthorSuggestions(response.data.data.map((author) => ({
          uuid: author.id,
          name: author.attributes.name,
        })));
      } catch (error) {
        console.error('Error fetching authors:', error);
      }
    } else {
      setAuthorSuggestions([]);
    }
  };

  useEffect(() => {
    // Buscar autores solo cuando el valor del campo de autor cambie
    searchAuthors(author);
  }, [author]);

  return (
    <div className="author-search-wrapper">
      <input
        type="text"
        placeholder="Search by Author"
        value={author}
        onChange={(e) => {
          setAuthor(e.target.value);  // Actualiza el estado del autor
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
                setAuthorSuggestions([]); // Limpiar las sugerencias después de seleccionar un autor
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
