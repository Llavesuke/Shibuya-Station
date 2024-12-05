import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import MangaCard from '../components/MangaCard';

const Home = () => {
  const [popularMangas, setPopularMangas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalMangas, setTotalMangas] = useState(0);
  const [error, setError] = useState(null);
  const mangasPerPage = 5;
  const baseUrl = 'https://api.mangadex.org';
  const location = useLocation();
  const navigate = useNavigate();

  const fetchPopularMangas = async (page) => {
    const offset = (page - 1) * mangasPerPage;
    try {
      const response = await axios.get(`${baseUrl}/manga`, {
        params: {
          limit: mangasPerPage,
          offset,
          order: { rating: 'desc' },
          includes: ['cover_art', 'author'],
        },
      });

      setPopularMangas(response.data.data);
      setTotalMangas(response.data.total);
    } catch (err) {
      console.error('Error fetching popular mangas:', err);
      setError('Error al obtener los mangas. Por favor, inténtalo más tarde.');
    }
  };

  const getPageFromUrl = () => {
    const urlParams = new URLSearchParams(location.search);
    const page = parseInt(urlParams.get('page'), 10);
    return isNaN(page) ? 1 : page;
  };

  useEffect(() => {
    const pageFromUrl = getPageFromUrl();
    setCurrentPage(pageFromUrl);
    fetchPopularMangas(pageFromUrl);
  }, [location]);

  const handleCardClick = (mangaId) => {
    navigate(`/manga/${mangaId}`);
  };

  return (
    <div className="home">
      <img className="home__banner" src="banner-home.png" alt="imagen manga de Shibuya" />
      <h1 className="home__title">WELCOME TO SHIBUYA</h1>
      <div className="home__placeholder">ES HORA DE SUBIRTE AL TREN</div>

      <div className="home__bottom">
        <div className="home__info-box">¡Saliendo de la estación!</div>
        <button className="home__button">Popular</button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="home__popular-mangas">
        <div className="library__grid">
          {popularMangas.map((manga) => {
            const cover = manga.relationships?.find((rel) => rel.type === 'cover_art');
            const author = manga.relationships?.find((rel) => rel.type === 'author');
            
            const coverUrl = cover
              ? `https://uploads.mangadex.org/covers/${manga.id}/${cover.attributes.fileName}`
              : 'https://via.placeholder.com/150';

            const authorName = author ? author.attributes?.name : 'Unknown Author';
            
            // Check for the title in English (or fallback to Japanese, then a default value)
            const title = manga.attributes?.title?.en || manga.attributes?.title?.ja || 'Untitled Manga';

            return (
              <MangaCard
                key={manga.id}
                id={manga.id}
                title={title}
                author={authorName}
                coverUrl={coverUrl}
                onClick={handleCardClick}
              />
            );
          })}
        </div>
      </div>

      <div className="home__box-content">
        <img
          className="box-content__image"
          src="isagi-block.png"
          alt="Yoichi Isagi falling manga draw"
        />
        <p className="box-content__text">
          Una <span>experiencia como </span> nunca antes
        </p>
      </div>

      <div className="home__bottom">
        <button className="home__button">Popular</button>
      </div>
    </div>
  );
};

export default Home;
