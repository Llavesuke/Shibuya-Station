import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaUser, FaBook, FaBell } from 'react-icons/fa';
import { CgLogIn } from "react-icons/cg";
import { MdOutlineBorderColor } from "react-icons/md";
import { UserContext } from '../context/userContext';
import SearchBar from './SearchBar'; // Import the SearchBar component
import CloseSession from '../components/CloseSession';

/**
 * Navbar component that displays the navigation bar with links and search functionality.
 * @component
 * @returns {JSX.Element} The Navbar component.
 */
const Navbar = () => {
  const [user, setUser] = useContext(UserContext); // Get the user state from context

  /**
   * Handles the search results from the SearchBar component.
   * @param {Array} results - The search results.
   */
  const handleSearchResults = (results) => {
    console.log(results); // The search results can be used or processed here.
  };

  return (
    <nav className="navbar">
      <ul>
        <li>
          <NavLink to="/" className="navbar__link">
            <img alt="Train logo" className="link__logo" src="/Train-icon.svg"/>
            <span className="link__vector"></span>
            <p className="link__title">SHIBUYA STATION</p>
          </NavLink>
        </li>

        {/* Search bar */}
        <li>
          <SearchBar onSearchResults={handleSearchResults} />
        </li>

        {/* Home link */}
        <li>
          <NavLink to="/" className="navbar__link">
            <FaHome className="link__icon" />
            <span className="link__text">Home</span>
          </NavLink>
        </li>

        {/* If no user, show Login and Register */}
        <li>
          {!user && (
            <>
              <NavLink to="/login" className="navbar__link">
                <CgLogIn className='link__icon'/>              
                <span className="link__text">Login</span>
              </NavLink>
              <NavLink to="/register" className="navbar__link">
                <MdOutlineBorderColor className='link__icon'/>
                <span className="link__text">Register</span>
              </NavLink>
            </>
          )}
        </li>

        {/* If there is a user, show Profile and Logout */}
        <li>
          {user && (
            <>
              <NavLink to="/profile" className="navbar__link">
                <FaUser className="link__icon" />
                <span className="link__text">Profile</span>
              </NavLink>
            </>
          )}
        </li>

        {/* Links to Library and Notifications */}
        <li>
          <NavLink to="/library" className="navbar__link">
            <FaBook className="link__icon" />
            <span className="link__text">Library</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/notifications" className="navbar__link">
            <FaBell className="link__icon" />
            <span className="link__text">Notifications</span>
          </NavLink>
        </li>

        <li>
          { user && <CloseSession className="navbar__link" /> }
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;