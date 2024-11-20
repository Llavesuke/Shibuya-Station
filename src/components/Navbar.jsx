import React from 'react';
import { NavLink } from 'react-router-dom'; // Importa NavLink para navegación con estilos activos.
import { FaHome, FaUser, FaBook, FaBell } from 'react-icons/fa'; // Importa íconos específicos de react-icons.

const Navbar = () => {
  return (
    <nav>
      <div className='container'>
        {/* Logo y texto principal de la aplicación */}
        <NavLink to="/" className="nav-link">
          <div className="nav-logo">
            <img src="Train-icon.svg" className="nav-logo" alt="" />
            <div className="vector"></div> 
            <p className="text-logo">SHIBUYA STATION</p>
          </div>
        </NavLink>

        {/* Enlace a la página Home */}
        <NavLink to="/" className="nav-link">
          <div className="nav-item">
            <FaHome className="nav-icon" /> {/* Ícono de casa para el menú Home */}
            <span>Home</span>
          </div>
        </NavLink>

        {/* Enlace a la página Profile */}
        <NavLink to="/profile" className="nav-link">
          <div className="nav-item">
            <FaUser className="nav-icon" /> {/* Ícono de usuario para el perfil */}
            <span>Profile</span>
          </div>
        </NavLink>

        {/* Enlace a la página Library */}
        <NavLink to="/library" className="nav-link">
          <div className="nav-item">
            <FaBook className="nav-icon" /> {/* Ícono de libro para la biblioteca */}
            <span>Library</span>
          </div>
        </NavLink>

        {/* Enlace a la página Notifications */}
        <NavLink to="/notifications" className="nav-link">
          <div className="nav-item">
            <FaBell className="nav-icon" /> {/* Ícono de campana para notificaciones */}
            <span>Notifications</span>
          </div>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
