import React, { useState, useEffect } from 'react';
import MangaCard from '../components/MangaCard';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

/**
 * Profile component that displays the user's profile and their manga lists.
 * @component
 * @returns {JSX.Element} The Profile component.
 */
const Profile = () => {
  const [favoriteMangas, setFavoriteMangas] = useState([]);
  const [pendingMangas, setPendingMangas] = useState([]);
  const [readingMangas, setReadingMangas] = useState([]);
  const [completedMangas, setCompletedMangas] = useState([]);
  const [view, setView] = useState('all'); // State to manage the current view
  const [profileImage, setProfileImage] = useState(localStorage.getItem('profileImage') || 'path-to-your-image.png'); // State to manage the profile image
  const navigate = useNavigate();

  useEffect(() => {
    // Load manga lists from localStorage
    const storedFavorites = JSON.parse(localStorage.getItem('favoriteMangas')) || [];
    setFavoriteMangas(storedFavorites);

    const storedPending = JSON.parse(localStorage.getItem('pendiente')) || [];
    setPendingMangas(storedPending);

    const storedReading = JSON.parse(localStorage.getItem('leyendo')) || [];
    setReadingMangas(storedReading);

    const storedCompleted = JSON.parse(localStorage.getItem('terminado')) || [];
    setCompletedMangas(storedCompleted);
  }, []);

  const updateFavorites = (updatedFavorites) => {
    setFavoriteMangas(updatedFavorites);
  };

  /**
   * Handles the view change.
   * @function
   * @param {string} newView - The new view to set.
   */
  const handleViewChange = (newView) => {
    setView(newView);
  };

  /**
   * Renders the manga cards for the given list of mangas.
   * @function
   * @param {Array} mangas - The list of mangas to render.
   * @returns {JSX.Element} The rendered manga cards.
   */
  const renderMangas = (mangas) => (
    <section className="profile__favorite-mangas">
      {mangas.map((manga) => (
        <MangaCard
          key={manga.id}
          id={manga.id}
          title={manga.title}
          author={manga.authorName}
          coverUrl={manga.coverUrl}
          onClick={() => navigate(`/manga/${manga.id}`)}
          onUpdateFavorites={updateFavorites}
        />
      ))}
    </section>
  );

  /**
   * Handles the profile image change.
   * @function
   * @param {Object} event - The event object.
   */
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const img = new Image();
      img.onload = () => {
        if (img.width >= 500 && img.height >= 500) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const imageUrl = e.target.result;
            setProfileImage(imageUrl);
            localStorage.setItem('profileImage', imageUrl); // Save the image to localStorage
          };
          reader.readAsDataURL(file);
        } else {
          toast.error('Image must be at least 500x500 pixels', {
            style: {
              backgroundColor: '#003366',
              color: '#E2E2B6',
            },
          });
        }
      };
      img.src = URL.createObjectURL(file);
    }
  };

  return (
    <main className="profile">
      <article className="profile__card">
      <section 
          /* He definido el estilo directamente aqui ya que es un estilo que no voy a utilizar en ningun otro sitio
          por tanto, puedo declalarlo directamente aquí aunque esto es una mala praxis*/
          style={{ 
            flex: 1, 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center' 
          }} 
          className="profile__left"
        >
          <figure className="profile__image-container">
            <img
              src={profileImage}
              alt="Profile Avatar"
              className="profile__image"
              style={{ cursor: 'pointer', objectFit: 'cover', objectPosition: 'center' }}
              onClick={() => document.getElementById('profileImageInput').click()}
            />
            <input
              type="file"
              accept="image/*"
              id="profileImageInput"
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
          </figure>
        </section>
        <section className="profile__right">
          <header className="profile__header">
            <img alt="Background Tren" className="profile__bg-tren" src="/bg-tren.png" />
            <h1 className="profile__username">ElVaquilla</h1>
            <p className="profile__date">Fecha de embarque: 20-02-2024</p>
          </header>
          <hr className="profile__divider" />
          <section className="profile__details-row">
            <div className="profile__detail-item">
              <p className="profile__label">Asiento</p>
              <p className="profile__value">10</p>
            </div>
            <div className="profile__detail-item">
              <p className="profile__label">Manga favorito</p>
              <p className="profile__value">Oshi No Ko</p>
            </div>
            <div className="profile__detail-item">
              <p className="profile__label">Plataforma</p>
              <p className="profile__value">4</p>
            </div>
          </section>
          <hr className="profile__divider" />
          <p className="profile__manga-count">Mangas leídos: 777</p>
          <div className="profile__barcode">
            <span className="profile__barcode-text">Shibuya Station Code</span>
          </div>
        </section>
      </article>
      <nav className="profile__actions">
        <button className="profile__button" onClick={() => handleViewChange('pending')}>Pendiente</button>
        <button className="profile__button" onClick={() => handleViewChange('reading')}>Leyendo</button>
        <button className="profile__button" onClick={() => handleViewChange('completed')}>Terminados</button>
        <button className="profile__button" onClick={() => handleViewChange('favorites')}>Favoritos</button>
      </nav>
      
      {view === 'favorites' && (
        <section className="profile__favorite-mangas-container">
          <h2>Mangas Favoritos</h2>
          {renderMangas(favoriteMangas)}
        </section>
      )}

      {view === 'pending' && (
        <section className="profile__favorite-mangas-container">
          <h2>Mangas Pendientes</h2>
          {renderMangas(pendingMangas)}
        </section>
      )}
      {view === 'reading' && (
        <section className="profile__favorite-mangas-container">
          <h2>Mangas Leyendo</h2>
          {renderMangas(readingMangas)}
        </section>
      )}
      {view === 'completed' && (
        <section className="profile__favorite-mangas-container">
          <h2>Mangas Terminados</h2>
          {renderMangas(completedMangas)}
        </section>
      )}
    </main>
  );
};

export default Profile;