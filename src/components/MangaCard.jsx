import React, { useState, useEffect } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';

/**
 * MangaCard component that displays a manga card with its details.
 * @component
 * @param {Object} props - The props object.
 * @param {string} props.id - The ID of the manga.
 * @param {string} props.title - The title of the manga.
 * @param {string} props.author - The author of the manga.
 * @param {string} props.coverUrl - The cover URL of the manga.
 * @param {Function} props.onClick - Function to handle click events on the manga card.
 * @returns {JSX.Element} The MangaCard component.
 */
const MangaCard = ({ id, title, author, coverUrl, onClick }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Check if the manga is already in the favorites list in localStorage
    const storedFavorites = JSON.parse(localStorage.getItem('favoriteMangas')) || [];
    const isFav = storedFavorites.some(manga => manga.id === id);
    setIsFavorite(isFav);
  }, [id]);

  /**
   * Handles the click event on the star icon to toggle favorite status.
   * @function
   * @param {Object} event - The event object.
   */
  const handleStarClick = (event, onUpdateFavorites) => {
    event.stopPropagation(); // Prevent triggering the onClick event of the card
    const storedFavorites = JSON.parse(localStorage.getItem('favoriteMangas')) || [];
    let updatedFavorites;
  
    if (isFavorite) {
      // Remove from favorites
      updatedFavorites = storedFavorites.filter(manga => manga.id !== id);
    } else {
      // Add to favorites
      const newFavorite = { id, title, authorName: author, coverUrl };
      updatedFavorites = [...storedFavorites, newFavorite];
    }
  
    localStorage.setItem('favoriteMangas', JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
  
    if (onUpdateFavorites) {
      onUpdateFavorites(updatedFavorites);
    }
  };

  return (
    <article className="library__manga-card" onClick={() => onClick(id)}>
      <figure className="library__manga-card-figure">
        <img
          className="library__manga-card-image"
          src={coverUrl}
          alt={title || 'No Title'}
        />
        <div className="library__manga-card-overlay"></div>
        <figcaption className="library__manga-card-gradient"></figcaption>

        {/* Star icon that toggles favorite status on click */}
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

export default MangaCard;