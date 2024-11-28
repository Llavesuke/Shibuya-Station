import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom'; // Importa NavLink para navegación.
import { FaHome, FaUser, FaBook, FaBell } from 'react-icons/fa'; // Importa íconos.
import { UserContext } from '../context/userContext'; // Importa el UserContext
import CloseSession from '../components/CloseSession';

const Navbar = () => {
  const [user, setUser] = useContext(UserContext); 

  return (
    <nav className='navbar'>

      <ul>
        <li>
        <NavLink to="/" className="navbar__link">
            <img src="Train-icon.svg" className="link__logo" alt="" />
            <div className="link__vector"></div>
            <p className="link__title">SHIBUYA STATION</p>
        </NavLink>
        </li>

        {/* Home link */}
        <li>
        <NavLink to="/" className="navbar__link">
            <FaHome className="link__icon" />
            <span className='link__text'>Home</span>
        </NavLink>
          
        </li>

        <li>
        {!user && (
          <>
            <NavLink to="/login" className="navbar__link">
                <span className='link__text'>Login</span>
            </NavLink>
          </>
        )}

        {!user && (
          <>
          <NavLink to="/register" className="navbar__link">
                <span className='link__text'>Register</span> 
            </NavLink>
          </>
        )}
        </li>

        <li>
        {user && ( 
          <><NavLink to="/profile" className="navbar__link">
            <FaUser className="link__icon" />
            <span className='link__text'>Profile</span>
        </NavLink> 
        </>
        )}
        </li>

        <li>
        <NavLink to="/library" className="navbar__link">
            <FaBook className="link__icon" />
            <span className='link__text'>Library</span>
        </NavLink>
        </li>

        <li>
        <NavLink to="/notifications" className="navbar__link">
            <FaBell className="link__icon" />
            <span className='link__text'>Notifications</span>
        </NavLink>
        </li>

        <li>
        {user && (
            <>
                <CloseSession className="navbar__link"/> 
            </>
        )}
        </li>

      </ul>
    </nav>
  );
};

export default Navbar;
