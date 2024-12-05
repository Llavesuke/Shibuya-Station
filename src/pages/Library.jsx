import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MangaCard from '../components/MangaCard';
import useMangaFilters from '../hook/useMangaFilters';
import SearchBar from '../components/SearchBarLibrary';
import Filters from '../components/Filters';
import Pagination from '../components/Pagination';
import AuthorSearch from '../components/AuthorSearch';
import useTagFilters from '../hook/useTagFilters';

const Library = () => {
  const [mangas, setMangas] = useState([]);
  const [totalMangas, setTotalMangas] = useState(0);
  const [author, setAuthor] = useState('');
  const [authorUUID, setAuthorUUID] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Obtener la página actual desde los parámetros de la URL
  const currentPage = parseInt(new URLSearchParams(location.search).get('page'), 10) || 1;

  // Hooks de filtros
  const {
    query, setQuery, status, setStatus,
    demographic, setDemographic, contentRating, setContentRating,
    fetchMangas
  } = useMangaFilters(location, currentPage, setMangas, setTotalMangas);

  const {
    allTags, includedTags, excludedTags, addTag, removeTag
  } = useTagFilters();

  // Efecto para manejar los filtros desde la URL
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);

    // Recuperar los parámetros de la URL y establecer los filtros
    const queryFromUrl = urlParams.get('query') || '';
    const authorUUIDFromUrl = urlParams.get('authorUUID') || '';
    const statusFromUrl = urlParams.get('status') || '';
    const demographicFromUrl = urlParams.get('demographic') || '';
    const contentRatingFromUrl = urlParams.get('contentRating') || '';

    const includedTagsFromUrl = urlParams.getAll('includedTags[]');
    const excludedTagsFromUrl = urlParams.getAll('excludedTags[]');

    // Establecer los filtros de acuerdo a la URL
    setQuery(queryFromUrl);
    setAuthorUUID(authorUUIDFromUrl);
    setStatus(statusFromUrl);
    setDemographic(demographicFromUrl);
    setContentRating(contentRatingFromUrl);

    // Agregar tags desde la URL
    includedTagsFromUrl.forEach(tag => addTag(tag));
    excludedTagsFromUrl.forEach(tag => removeTag(tag));

    fetchMangas(currentPage); // Obtener mangas filtrados

  }, [location.search, currentPage]); // Ejecutar cuando los filtros o la página cambian

  // Función para actualizar la URL con los filtros actuales
  const updateUrlParams = () => {
    const urlParams = new URLSearchParams();
    if (query) urlParams.set('query', query);
    if (authorUUID) urlParams.set('authorUUID', authorUUID);
    if (status) urlParams.set('status', status);
    if (includedTags.length > 0) {
      includedTags.forEach(tag => urlParams.append('includedTags[]', tag));
    }
    if (excludedTags.length > 0) {
      excludedTags.forEach(tag => urlParams.append('excludedTags[]', tag));
    }
    if (demographic) urlParams.set('demographic', demographic);
    if (contentRating) urlParams.set('contentRating', contentRating);
    urlParams.set('page', currentPage);
    navigate(`?${urlParams.toString()}`);
  };

  // Función para la paginación hacia la siguiente página
  const nextPage = () => {
    if (currentPage < Math.ceil(totalMangas / 15)) {
      navigate(`?page=${currentPage + 1}`);
    }
  };

  // Función para la paginación hacia la página anterior
  const prevPage = () => {
    if (currentPage > 1) {
      navigate(`?page=${currentPage - 1}`);
    }
  };

  return (
    <div className="library">
      <h1 className="library__title">Library</h1>

      <SearchBar query={query} setQuery={setQuery} handleSearch={updateUrlParams} />

      <AuthorSearch
        author={author}
        setAuthor={setAuthor}
        setAuthorUUID={setAuthorUUID}
        updateUrlParams={updateUrlParams}
      />

      {/* Filtros de Tags */}
      <Filters
        includedTags={includedTags} 
        excludedTags={excludedTags} 
        allTags={allTags} 
        addTag={addTag} 
        removeTag={removeTag}
      />

      <div className="library__grid">
        {mangas.map((manga) => {
          const cover = manga.relationships?.find((rel) => rel.type === 'cover_art');
          const author = manga.relationships?.find((rel) => rel.type === 'author');
          const coverUrl = cover?.attributes?.fileName
            ? `https://uploads.mangadex.org/covers/${manga.id}/${cover.attributes.fileName}`
            : 'https://via.placeholder.com/150';
          const authorName = author?.attributes?.name || 'Unknown Author';
          const title = manga.attributes?.title?.en || manga.attributes?.title?.ja || 'Untitled Manga';

          return (
            <MangaCard
              key={manga.id}
              id={manga.id}
              title={title}
              author={authorName}
              coverUrl={coverUrl}
              onClick={() => navigate(`/manga/${manga.id}`)}
            />
          );
        })}
      </div>

      <Pagination
        currentPage={currentPage} totalMangas={totalMangas} mangasPerPage={15}
        nextPage={nextPage} prevPage={prevPage}
      />
    </div>
  );
};

export default Library;
