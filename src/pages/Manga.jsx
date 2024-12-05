import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Manga = () => {
  const { mangaId } = useParams();
  const [mangaDetails, setMangaDetails] = useState(null);
  const [chapters, setChapters] = useState([]);
  const baseUrl = 'https://api.mangadex.org';
  const navigate = useNavigate()

  const handleChapterClick = (chapterId) => {
    navigate(`/chapter/${chapterId}`); 
  };

  useEffect(() => {
    const fetchMangaDetails = async () => {
      try {
        // Obtener detalles del manga
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
    <div className="manga-container">
      {/* Sección Izquierda */}
      <div className="manga-left">
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
      </div>

      {/* Sección Derecha */}
      <div className="manga-right">
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
      </div>
    </div>
  );
};

export default Manga;
