import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <main className="notfound">
      <section className="notfound__images">
        <img src="tren.png" alt="Tren" className="notfound__image notfound__image--tren" />
        <img src="inosuke.png" alt="Inosuke" className="notfound__image notfound__image--inosuke" />
        <img src="shibuya-text.png" alt="Shibuya Text" className="notfound__image notfound__image--shibuya" />
      </section>
      <section className="notfound__overlay">
        <h1 className="notfound__title">404</h1>
        <p className="notfound__subtitle">You are doomed</p>
        <button className="notfound__button" onClick={handleGoHome}>GO HOME</button>
      </section>
    </main>
  );
};

export default NotFound;