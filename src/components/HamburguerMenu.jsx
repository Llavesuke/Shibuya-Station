import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes, FaHome, FaUser, FaBook, FaBell } from 'react-icons/fa';
import { CgLogIn } from "react-icons/cg";
import { MdOutlineBorderColor } from "react-icons/md";
import CloseSession from '../components/CloseSession';
import SearchMobile from './SearchMobile'; // Import the SearchMobile component

const HamburgerMenu = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleSearchResults = (results) => {
    console.log(results); // The search results can be used or processed here.
  };

  return (
    <nav className="hamburger-menu">
      <div className="hamburger-menu__toggle" onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>
      <ul className={`hamburger-menu__list ${isOpen ? 'hamburger-menu__list--open' : ''}`}>
        <li className="hamburger-menu__logo-container">
          <NavLink to="/" className="hamburger-menu__link-logo" onClick={closeMenu}>
            <img alt="Train logo" className="hamburger-link__logo" src="/Train-icon.svg" />
            <p className="hamburger-link__title">SHIBUYA STATION</p>
          </NavLink>
        </li>
        <li>
          <SearchMobile onSearchResults={handleSearchResults} />
        </li>
        <li>
          <NavLink to="/" className="hamburger-menu__link" onClick={closeMenu}>
            <FaHome className="hamburger-link__icon" />
            <span className="hamburger-link__text">Home</span>
          </NavLink>
        </li>
        {!user && (
          <>
            <li>
              <NavLink to="/login" className="hamburger-menu__link" onClick={closeMenu}>
                <CgLogIn className="hamburger-link__icon" />
                <span className="hamburger-link__text">Login</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/register" className="hamburger-menu__link" onClick={closeMenu}>
                <MdOutlineBorderColor className="hamburger-link__icon" />
                <span className="hamburger-link__text">Register</span>
              </NavLink>
            </li>
          </>
        )}
        {user && (
          <>
            <li>
              <NavLink to="/profile" className="hamburger-menu__link" onClick={closeMenu}>
                <FaUser className="hamburger-link__icon" />
                <span className="hamburger-link__text">Profile</span>
              </NavLink>
            </li>
            <li>
              <CloseSession className="hamburger-menu__link" />
            </li>
          </>
        )}
        <li>
          <NavLink to="/library" className="hamburger-menu__link" onClick={closeMenu}>
            <FaBook className="hamburger-link__icon" />
            <span className="hamburger-link__text">Library</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/notifications" className="hamburger-menu__link" onClick={closeMenu}>
            <FaBell className="hamburger-link__icon" />
            <span className="hamburger-link__text">Notifications</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default HamburgerMenu;