import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/userContext';

/**
 * Manga component that displays detailed information about a manga and its chapters.
 * @component
 * @returns {JSX.Element} The Manga component.
 */
const Manga = () => {
  const { mangaId } = useParams(); // Get the manga ID from the URL parameters
  const [mangaDetails, setMangaDetails] = useState(null); // State to store manga details
  const [chapters, setChapters] = useState([]); // State to store chapters
  const baseUrl = 'https://api.mangadex.org';
  const navigate = useNavigate(); // Hook to navigate to other routes
  const [user, setUser] = useContext(UserContext); // Get the user state from context

  /**
   * Handles the click event on a chapter to navigate to the chapter details page.
   * @function
   * @param {string} chapterId - The ID of the clicked chapter.
   */
  const handleChapterClick = (chapterId) => {
    navigate(`/chapter/${chapterId}`, { state: { chapters } });
  };

  /**
   * Handles the change event on the reading status select element.
   * @function
   * @param {Object} event - The event object.
   */
  const handleReadingStatusChange = (event) => {
    const selectedReadingStatus = event.target.value;
    const mangaData = {
      id: mangaDetails.id,
      title: mangaDetails.attributes?.title?.en || 'No Title',
      coverUrl,
      authorName,
      description: mangaDetails.attributes?.description?.en || 'No description available.',
      tags,
    };

    // Remove manga from all possible statuses
    ['pendiente', 'leyendo', 'terminado'].forEach(status => {
      const storedManga = localStorage.getItem(status);
      if (storedManga) {
        let mangaList = [];
        try {
          mangaList = JSON.parse(storedManga);
          if (!Array.isArray(mangaList)) {
            mangaList = [];
          }
        } catch (e) {
          mangaList = [];
        }
        const updatedMangaList = mangaList.filter(manga => manga.id !== mangaDetails.id);
        localStorage.setItem(status, JSON.stringify(updatedMangaList));
      }
    });

    // Add manga to the new selected status
    let existingMangaList = [];
    try {
      existingMangaList = JSON.parse(localStorage.getItem(selectedReadingStatus)) || [];
      if (!Array.isArray(existingMangaList)) {
        existingMangaList = [];
      }
    } catch (e) {
      existingMangaList = [];
    }
    existingMangaList.push(mangaData);
    localStorage.setItem(selectedReadingStatus, JSON.stringify(existingMangaList));
  };

  useEffect(() => {
    const fetchMangaDetails = async () => {
      try {
        // Fetch manga details
        const mangaResponse = await axios.get(`${baseUrl}/manga/${mangaId}`, {
          params: { includes: ['cover_art', 'author', 'tag'] },
        });
        setMangaDetails(mangaResponse.data.data);

        let allChapters = [];
        let limit = 100;
        let offset = 0;
        let hasMoreChapters = true;

        while (hasMoreChapters) {
          const chaptersResponse = await axios.get(`${baseUrl}/chapter`, {
            params: {
              manga: mangaId,
              translatedLanguage: ['en'],
              order: { chapter: 'asc' },
              limit,
              offset,
            },
          });
          const chaptersData = chaptersResponse.data.data;
          allChapters = [...allChapters, ...chaptersData];

          hasMoreChapters = chaptersData.length === limit;
          offset += limit; 
        }

        setChapters(allChapters);
      } catch (error) {
        console.log("Error fetching manga details:", error);
      }
    };

    fetchMangaDetails();
  }, [mangaId]);

  const cover = mangaDetails?.relationships?.find((rel) => rel.type === 'cover_art');
  const coverUrl = cover
    ? `https://uploads.mangadex.org/covers/${mangaDetails.id}/${cover.attributes?.fileName}`
    : 'https://via.placeholder.com/490';

  const author = mangaDetails?.relationships?.find((rel) => rel.type === 'author');
  const authorName = author ? author.attributes?.name : 'Unknown Author';

  const tags = mangaDetails?.attributes?.tags?.map((tag) => tag.attributes?.name?.en || tag.attributes?.name?.ja) || [];

  return (
    <main className="manga-container">
      {/* Left Section */}
      <section className="manga-left">
        <img className="manga-cover" src={coverUrl} alt={mangaDetails?.attributes?.title?.en || 'No Title'} />
        <h1 className="manga-title">{mangaDetails?.attributes?.title?.en || 'No Title'}</h1>
        <h2 className="manga-author">{authorName}</h2>
        <p className="manga-description">
          {mangaDetails?.attributes?.description?.en || 'No description available.'}
        </p>
        <div className="manga-tags">
          {tags.map((tag, index) => (
            <span key={index} className="manga-tag">{tag}</span>
          ))}
        </div>
        {user && (
          <div className="manga__estado">
            <select className="reading-status-select" onChange={handleReadingStatusChange}>
              <option value="">Selecciona un estado</option>
              <option value="pendiente">Pendiente</option>
              <option value="leyendo">Leyendo</option>
              <option value="terminado">Terminado</option>
            </select>
          </div>
        )}
      </section>

      {/* Right Section */}
      <aside className="manga-right">
        <div className="right__container">
          <h2>Capítulos</h2>
          <ul className="chapter-list">
            {chapters.map((chapter) => (
              <li key={chapter.id} className="chapter-item">
                <a
                  onClick={() => handleChapterClick(chapter.id)}
                  className="chapter-link"
                >
                  {chapter.attributes?.title || `Capítulo ${chapter.attributes?.chapter}`}
                  <span className="chapter-date">
                    {new Date(chapter.attributes?.publishAt).toLocaleDateString()}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          
        </div>
      </aside>
    </main>
  );
};

export default Manga;