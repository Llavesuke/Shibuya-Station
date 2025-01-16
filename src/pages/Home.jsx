import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import MangaCard from '../components/MangaCard';

const Home = () => {
  const [popularMangas, setPopularMangas] = useState([]);
  const [error, setError] = useState(null);
  const mangasPerPage = 15;
  const baseUrl = "https://shibuya-station-1.onrender.com/api";
  const navigate = useNavigate();

  const fetchPopularMangas = async () => {
    try {
      const response = await axios.get(`${baseUrl}/manga`, {       
        params: {
          limit: mangasPerPage,
          'order[rating]': 'desc',
          includes: ['cover_art', 'author'],
        },
      });
  
      if (response.data && response.data.data) {
        setPopularMangas(response.data.data);
      } else {
        throw new Error('Formato de respuesta inválido');
      }
    } catch (err) {
      console.error('Error fetching popular mangas:', err);
      setError('Error al obtener los mangas. Por favor, inténtalo más tarde.');
    }
  };

  useEffect(() => {
    fetchPopularMangas();
  }, [location]);

  const handleCardClick = (mangaId) => {
    navigate(`/manga/${mangaId}`);
  };

  const slidesPerView = popularMangas.length < 5 ? popularMangas.length : 5;

  return (
    <main className="home-container">
      <section className="home">
        <img className="home__banner" src="banner-home.png" alt="imagen manga de Shibuya" />
        <h1 className="home__title">WELCOME TO SHIBUYA</h1>
    
        <section className="home__bottom">
          <p className="home__info-box">¡Saliendo de la estación!</p>
          <button className="home__button">Popular</button>
        </section>

        {error && <p className="error-message">{error}</p>}

        <section className="home__popular-mangas">
          <Swiper
            spaceBetween={20}
            slidesPerView={slidesPerView}
            centeredSlides={true}
            loop={slidesPerView < popularMangas.length}
            slideToClickedSlide={true}
            preventClicks={false}
            preventClicksPropagation={false}
            breakpoints={{
              640: { slidesPerView: 3, spaceBetween: 10 },
              1024: { slidesPerView: 5, spaceBetween: 30 },
            }}
          >
            {popularMangas.map((manga, index) => {
              const cover = manga.relationships?.find((rel) => rel.type === 'cover_art');
              const author = manga.relationships?.find((rel) => rel.type === 'author');
              const coverUrl = cover && cover.attributes
                ? `https://uploads.mangadex.org/covers/${manga.id}/${cover.attributes.fileName}`
                : 'https://via.placeholder.com/150';

              const authorName = author ? author.attributes?.name : 'Unknown Author';
              const title = manga.attributes?.title?.en || manga.attributes?.title?.ja || 'Untitled Manga';

              return (
                <SwiperSlide key={`${manga.id}-${index}`}>
                  <article className="home__gallery-item swiper-slide">
                    <MangaCard
                      id={manga.id}
                      title={title}
                      author={authorName}
                      coverUrl={coverUrl}
                      onClick={() => handleCardClick(manga.id)}
                    />
                  </article>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </section>

        <section className="home__box-content">
          <img
            className="box-content__image"
            src="isagi-block.png"
            alt="Yoichi Isagi falling manga draw"
          />
          <p className="box-content__text">
            Una <span>experiencia como </span> nunca antes
          </p>
        </section>
      </section>
    </main>
  );
};

export default Home;
