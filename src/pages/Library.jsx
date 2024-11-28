import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const Library = () => {
  const [mangas, setMangas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalMangas, setTotalMangas] = useState(0);
  const mangasPerPage = 9;
  const baseUrl = 'https://api.mangadex.org';
  const location = useLocation();
  const navigate = useNavigate(); 

  // Función para obtener los mangas de la API
  const fetchMangas = async (page) => {
    const offset = (page - 1) * mangasPerPage;
    try {
      const resp = await axios({
        method: 'GET',
        url: `${baseUrl}/manga`,
        params: {
          limit: mangasPerPage, // Límite de mangas a traer por página
          offset: offset, // Calcula el desplazamiento con base en la página actual
          includes: ['cover_art'], // Incluir información del arte de portada
        },
      });
      setMangas(resp.data.data);
      setTotalMangas(resp.data.total);
    } catch (error) {
      console.error('Error fetching mangas:', error);
    }
  };

  // Obtener el número de página desde la URL
  const getPageFromUrl = () => {
    const urlParams = new URLSearchParams(location.search);
    const page = parseInt(urlParams.get('page'), 10);
    return isNaN(page) ? 1 : page; // Si la página no está definida, regresar 1 por defecto
  };

  useEffect(() => {
    const pageFromUrl = getPageFromUrl();
    setCurrentPage(pageFromUrl); // Sincronizar el estado con la URL
    fetchMangas(pageFromUrl); // Llamar a la API con la página obtenida
  }, [location]); // Reejecutar cada vez que cambia la ubicación (URL)

  const nextPage = () => {
    if (currentPage < Math.ceil(totalMangas / mangasPerPage)) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      navigate(`?page=${newPage}`); // Actualiza la URL con la nueva página
      fetchMangas(newPage); // Llama a la API con la nueva página
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      navigate(`?page=${newPage}`); // Actualiza la URL con la nueva página
      fetchMangas(newPage); // Llama a la API con la nueva página
    }
  };

  return (
    <div>
      <h1 className='title-manga'>Library</h1>
      <div className="manga-grid right-aligned"> 
        {mangas.map((manga) => {
          // Busca la relación de 'cover_art' para obtener la URL de la portada
          const cover = manga.relationships.find(
            (rel) => rel.type === 'cover_art'
          );
          const coverUrl = cover
            ? `https://uploads.mangadex.org/covers/${manga.id}/${cover.attributes.fileName}`
            : 'https://via.placeholder.com/150'; // Imagen de respaldo si no hay portada disponible
  
          return (
            <div key={manga.id} className="manga-card">
              <img src={coverUrl} alt={manga.attributes.title.en} />
              <h3>{manga.attributes.title.en || 'No Title'}</h3>
            </div>
          );
        })}
      </div>
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage} of {Math.ceil(totalMangas / mangasPerPage)}</span>
        <button
          onClick={nextPage}
          disabled={currentPage === Math.ceil(totalMangas / mangasPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
}  

export default Library;
