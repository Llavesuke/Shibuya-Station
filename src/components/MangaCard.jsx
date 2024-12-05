import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaStar, FaRegStar } from 'react-icons/fa'; // Usamos react-icons para las estrellas

const MangaCard = ({ id, title, author, coverUrl, onClick }) => {
  const [isFavorite, setIsFavorite] = useState(false); // Estado para manejar si es favorito

  // Función para manejar el clic en la estrella
  const handleStarClick = (e) => {
    e.stopPropagation(); // Evitar que el clic en la estrella active la función onClick de la tarjeta
    setIsFavorite(!isFavorite); // Cambiar el estado del favorito
  };

  return (
    <article
      className="library__manga-card"
      onClick={() => onClick(id)} // Llama a la función onClick pasando el id
    >
      <figure className="library__manga-card-figure">
        <img
          className="library__manga-card-image"
          src={coverUrl}
          alt={title || 'No Title'}
        />
        <div className="library__manga-card-overlay"></div>
        <figcaption className="library__manga-card-gradient"></figcaption>

        {/* Estrella que cambia de estado al hacer clic */}
        <div className="library__manga-card-star" onClick={handleStarClick}>
          {isFavorite ? <FaStar className="favorite-star" /> : <FaRegStar className="favorite-star" />}
        </div>
      </figure>
      <section className="library__manga-card-content">
        <h3 className="library__manga-card-title">{title || 'No Title'}</h3>
        <p className="library__manga-card-author">{author || 'Unknown Author'}</p>
      </section>
    </article>
  );
};

// Validación de props para asegurar el uso correcto
MangaCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  author: PropTypes.string,
  coverUrl: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired, // La función que se ejecutará al hacer clic en la tarjeta
};

export default MangaCard;
