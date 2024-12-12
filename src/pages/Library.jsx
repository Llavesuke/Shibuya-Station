import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MangaCard from '../components/MangaCard';
import useMangaFilters from '../hook/useMangaFilters';
import SearchBar from '../components/SearchBarLibrary';
import Filters from '../components/Filters';
import Pagination from '../components/Pagination';
import AuthorSearch from '../components/AuthorSearch';
import useTagFilters from '../hook/useTagFilters';

/**
 * Library component that displays a list of mangas with filtering and pagination.
 * @component
 * @returns {JSX.Element} The Library component.
 */
const Library = () => {
  const [mangas, setMangas] = useState([]);
  const [totalMangas, setTotalMangas] = useState(0);
  const [author, setAuthor] = useState('');
  const [authorUUID, setAuthorUUID] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Get the current page from the URL parameters
  const currentPage = parseInt(new URLSearchParams(location.search).get('page'), 10) || 1;

  // Hooks for filters
  const {
    query, setQuery, status, setStatus,
    demographic, setDemographic, contentRating, setContentRating,
    fetchMangas
  } = useMangaFilters(location, currentPage, setMangas, setTotalMangas);

  const {
    allTags, includedTags, excludedTags, addTag, removeTag
  } = useTagFilters();

  // Effect to handle filters from the URL
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);

    // Retrieve parameters from the URL and set filters
    const queryFromUrl = urlParams.get('query') || '';
    const authorUUIDFromUrl = urlParams.get('authorUUID') || '';
    const statusFromUrl = urlParams.get('status') || '';
    const demographicFromUrl = urlParams.get('demographic') || '';
    const contentRatingFromUrl = urlParams.get('contentRating') || '';

    const includedTagsFromUrl = urlParams.getAll('includedTags[]');
    const excludedTagsFromUrl = urlParams.getAll('excludedTags[]');

    // Set filters according to the URL
    setQuery(queryFromUrl);
    setAuthorUUID(authorUUIDFromUrl);
    setStatus(statusFromUrl);
    setDemographic(demographicFromUrl);
    setContentRating(contentRatingFromUrl);

    // Add tags from the URL
    includedTagsFromUrl.forEach(tag => addTag(tag, true));
    excludedTagsFromUrl.forEach(tag => addTag(tag, false));

    fetchMangas(currentPage); // Fetch filtered mangas

  }, [location.search, currentPage]); // Execute when filters or page change

  /**
   * Updates the URL with the current filters.
   * @function
   */
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
    urlParams.set('page', 1); // Reset the page to 1
    navigate(`?${urlParams.toString()}`);
  };

  /**
   * Handles pagination to the next page.
   * @function
   */
  const nextPage = () => {
    if (currentPage < Math.ceil(totalMangas / 15)) {
      const urlParams = new URLSearchParams(location.search);
      urlParams.set('page', currentPage + 1);
      navigate(`?${urlParams.toString()}`);
    }
  };

  /**
   * Handles pagination to the previous page.
   * @function
   */
  const prevPage = () => {
    if (currentPage > 1) {
      const urlParams = new URLSearchParams(location.search);
      urlParams.set('page', currentPage - 1);
      navigate(`?${urlParams.toString()}`);
    }
  };

  return (
    <section className="library">
      <header className="library__header">
        <h1 className="library__title">Library</h1>
      </header>

      <SearchBar query={query} setQuery={setQuery} />

      <AuthorSearch
        author={author}
        setAuthor={setAuthor}
        setAuthorUUID={setAuthorUUID}
        updateUrlParams={updateUrlParams}
      />

      {/* Tag Filters */}
      <Filters
        allTags={allTags}
        includedTags={includedTags}
        excludedTags={excludedTags}
        addTag={addTag}
        removeTag={removeTag}
        status={status}
        setStatus={setStatus}
        demographic={demographic}
        setDemographic={setDemographic}
        contentRating={contentRating}
        setContentRating={setContentRating}
      />

      <button onClick={updateUrlParams} className="library__search-button">
        <p className="library__search-button-text">Search</p>
      </button>

      <section className="library__grid">
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
              onClick={() => navigate(`/manga/${manga.id}`)} // Navigate to the manga details page
            />
          );
        })}
      </section>

      <Pagination
        currentPage={currentPage} totalMangas={totalMangas} mangasPerPage={15}
        nextPage={nextPage} prevPage={prevPage}
      />
    </section>
  );
};

export default Library;