// src/components/Navbar.jsx

import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaUser, FaBook, FaBell } from 'react-icons/fa';
import { CgLogIn } from "react-icons/cg";
import { MdOutlineBorderColor } from "react-icons/md";
import { UserContext } from '../context/userContext';
import SearchBar from './SearchBar'; // Importa el componente SearchBar
import CloseSession from '../components/CloseSession';

const Navbar = () => {
  const [user, setUser] = useContext(UserContext);

  // Función para manejar los resultados de búsqueda
  const handleSearchResults = (results) => {
    console.log(results); // Los resultados de búsqueda se pueden usar aquí o procesar.
  };

  return (
    <nav className="navbar">
      <ul>
        <li>
          <NavLink to="/" className="navbar__link">
            <img alt="Train logo" className="link__logo" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDUiIGhlaWdodD0iMjUiIHZpZXdCb3g9IjAgMCA0NSAyNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9IkZyYW1lIDciPgo8ZyBpZD0iTG9nbyI+CjxwYXRoIGlkPSJUcmVubiIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik00MS4zMDgyIDE5LjQ3MDNWMjIuMTE3M0M0MS4zMDgyIDIyLjExNzMgNDAuMTAwOSAyMy41OTM5IDM5Ljc2NDEgMjMuNDQwOEMzOS40MjczIDIzLjI4NzcgMzIuNDg0OCAyMy40NDA4IDMyLjQ4NDggMjMuNDQwOEMzMi40ODQ4IDIzLjQ0MDggMzEuMjc3NSAyMi42MDEzIDMwLjcyMDEgMjEuNjc2MUMzMC42NzczIDIxLjY3MDIgMzAuNzIwMSAxOS4yNDk3IDMwLjcyMDEgMTkuMjQ5N0gyOS4zOTY2VjIyLjMzNzlIMjguNzM0OUwyNy4xOTA4IDIwLjEzMkwyMC4xMzIgMjAuNzkzOEwxOS4yNDk3IDIyLjU1ODVMMTguODA4NSAyMy4yMjAyTDEwLjY0NjkgMjMuNjYxNEw5Ljc2NDU2IDIyLjMzNzlMOC42NjE2NCAyMi4xMTczQzguNjYxNjQgMjIuMTE3MyA4LjExNjEzIDI2LjIwNDEgNi40NTU3OSAyMi41NTg1QzYuNDQ5ODMgMjIuNDc4OCA2LjAxNDYyIDIyLjc3OSA2LjAxNDYyIDIyLjc3OUM2LjAxNDYyIDIyLjc3OSA1LjAwOTY0IDI1LjY4OTQgNC4wMjkzNiAyMi41NTg1SDMuNTg4MTlDMy41ODgxOSAyMi41NTg1IDMuMDc5MyAyNS40MzIgMS44MjM1MSAyMi43NzlDMS44MTc1NSAyMi44MDk3IDEuODIzNTEgMjEuODk2NyAxLjgyMzUxIDIxLjg5NjdDMS44MjM1MSAyMS44OTY3IDAuNzI2NTQxIDIyLjQ1NDEgMC41IDIxLjIzNUMxMS45Mjc2IDE5LjY0ODEgMjkuNjE3MiAxNy4yNjQ0IDI5LjYxNzIgMTcuMjY0NEgzNS4xMzE4TDM1LjU3MyAxNi4xNjE1SDI5LjM5NjZMMC41IDIwLjU3MzJWMTMuNzM1MUMwLjUgMTMuNzM1MSAxLjE4NjI0IDEyLjAxODUgMi45MjY0MyAxMS43NDk4QzQuNjY2NjMgMTEuNDgxMSAzMC45NDA3IDAuNSAzMC45NDA3IDAuNUw0MS45Njk5IDEuNjAyOTJDNDEuOTY5OSAxLjYwMjkyIDQ0LjE2MzIgMi43Njg0OSA0NC4zOTY0IDQuNDcwNTJDNDQuNjI5NSA2LjE3MjU1IDQ0LjM5NjQgMTYuMTYxNSA0NC4zOTY0IDE2LjE2MTVINDAuMjA1M0M0MC4yMDUzIDE2LjE2MTUgNDAuMDA4NyAxNy4zNjM5IDQwLjg2NyAxNy4yNjQ0QzQxLjcyNTMgMTcuMTY0OSA0NC4zOTY0IDE3LjI2NDQgNDQuMzk2NCAxNy4yNjQ0QzQ0LjM5NjQgMTcuMjY0NCA0NC4xMjY0IDE5LjI3NTUgNDMuMjkzNCAxOS4yNDk3QzQyLjYyNjEgMTkuMjU4NCA0MS45NjEyIDE5LjMzMjMgNDEuMzA4MiAxOS40NzAzWk0zNC4yNDk1IDMuMTQ3MDJMNDEuMzA4MiA0LjAyOTM1QzQxLjMwODIgNC4wMjkzNSA0Mi4xNzUzIDUuMjI2NjkgNDEuMzA4MiA1LjU3MzQ1QzQwLjIyMDUgNS40MDUzNiAzNC42OTA2IDQuOTExNjkgMzQuNjkwNiA0LjkxMTY5QzM0LjY5MDYgNC45MTE2OSAzMi41NTgzIDQuNTgwODIgMzQuMjQ5NSAzLjE0NzAyWk0zMi40ODQ4IDUuNTczNDVMMzYuNjc1OSA1Ljc5NDAzQzM2LjY3NTkgNS43OTQwMyAzNy4zOTYxIDYuNDM5OSAzNy4zMzc3IDYuODk2OTVDMzcuMjc5MiA3LjM1NCAzNy41NDMgMTEuNTg3IDM2Ljg5NjUgMTEuNTI5MkMzNi4yNSAxMS40NzE0IDMyLjkyNiAxMS4zMDg2IDMyLjkyNiAxMS4zMDg2QzMyLjkyNiAxMS4zMDg2IDMyLjEwMjEgMTEuODgyMiAzMS44MjMgOS4zMjMzOEMzMS41NDQgNi43NjQ2IDMyLjQ4NDggNS41NzM0NSAzMi40ODQ4IDUuNTczNDVaTTM4LjQ0MDYgNi4yMzUyTDQyLjE5MDUgNi40NTU3OEM0Mi4xOTA1IDYuNDU1NzggNDIuODc0MyA2LjM2NzU1IDQzLjA3MjkgNy41NTg3MUM0My4yNzE0IDguNzQ5ODYgNDMuMjkzNCAxMS4zMDg2IDQzLjI5MzQgMTEuMzA4NkM0My4yOTM0IDExLjMwODYgNDIuODAwNCAxMi4xNzUxIDQyLjQxMTEgMTEuOTcwNEM0Mi4wMjE4IDExLjc2NTcgMzguNjYxMiAxMS43NDk4IDM4LjY2MTIgMTEuNzQ5OEMzOC42NjEyIDExLjc0OTggMzguMDIxNSAxMS44MDc2IDM3Ljc3ODggMTAuNjQ2OUMzNy41MzYyIDkuNDg2MTggMzcuNzc4OCA2LjY3NjM3IDM3Ljc3ODggNi42NzYzN0wzOC40NDA2IDYuMjM1MlpNMzMuMzY3MSAxMy43MzUxQzMzLjM2NzEgMTMuNzM1MSAzNC4xOTc2IDEzLjQ5ODYgMzQuMjQ5NSAxNC4xNzYyQzM0LjMwMTMgMTQuODUzOSAzNC4xNjEyIDE1LjQxMTUgMzMuMzY3MSAxNS4yNzkyQzMyLjU3MyAxNS4xNDY4IDMyLjg1MjUgMTMuNjk4MiAzMy4zNjcxIDEzLjczNTFaTTQxLjA4NzYgMTQuNjE3NEM0MS4xMjY5IDE0LjQ1NzIgNDEuMjA5NCAxNC4zMTA3IDQxLjMyNiAxNC4xOTQxQzQxLjQ0MjcgMTQuMDc3NCA0MS41ODkxIDEzLjk5NDkgNDEuNzQ5NCAxMy45NTU3QzQyLjI3ODggMTMuODYxMyA0My40NjIyIDE0LjY3NTIgNDEuOTY5OSAxNS40OTk4QzQwLjg4MjIgMTUuMjk1MSA0MS4wODc2IDE0LjYxNzQgNDEuMDg3NiAxNC42MTc0Wk0zMy44MDgzIDE5LjI0OTdIMzYuMjM0N0MzNi4yMzQ3IDE5LjI0OTcgMzYuNjk4IDIwLjI2NDQgMzYuODk2NSAyMC4xMzJDMzcuMDk1IDE5Ljk5OTcgMzkuNTQzNSAyMC4xMzIgMzkuNTQzNSAyMC4xMzJMMzkuOTg0NyAxOS4yNDk3SDQxLjA4NzZDNDEuMDg3NiAxOS4yNDk3IDQwLjc0MTUgMjAuODUxNiAzOS4zMjI5IDIxLjAxNDRDMzguMjk1NiAyMS4xMDY3IDM3LjI2MjEgMjEuMTA2NyAzNi4yMzQ3IDIxLjAxNDRDMzYuMjM0NyAyMS4wMTQ0IDM0LjAyODkgMjAuMTY4OSAzMy44MDgzIDE5LjI0OTdaTTI4Ljk1NTQgNi4wMTQ2MkMyOC45NTU0IDYuMDE0NjIgMjguMDk1MiA2LjQwMzI5IDI4LjA3MzEgNi42NzYzN0MyOC4wNTEgNi45NDk0NSAyNy43MjcgMTIuNjg5OSAyOC4yOTM3IDEyLjYzMjJDMjguNjM5OCAxMi44MzA3IDI5LjEyNDIgMTMuMjQxNCAyOS42MTcyIDEyLjQxMTZDMzAuMTEwMiAxMS41ODE3IDI5LjgzNzggNi4yMzUyIDI5LjgzNzggNi4yMzUyQzI5LjU3NDIgNi4wNzA3NSAyOS4yNjU0IDUuOTkzNTcgMjguOTU1NCA2LjAxNDYyWk0yNS42NDY3IDYuODk2OTVDMjUuNjQ2NyA2Ljg5Njk1IDI2LjgwNzggNi41NTAxOSAyNi41MjkgOC4yMjA0NkMyNi41MDY5IDkuOTYzMDggMjYuNTI5IDEyLjg1MjcgMjYuNTI5IDEyLjg1MjdDMjYuNTI5IDEyLjg1MjcgMjUuNzQxNyAxNC4xOTgzIDI0Ljk4NDkgMTMuMDczM0MyNC43NDIzIDEyLjI0MzUgMjQuOTg0OSA3LjU1ODcxIDI0Ljk4NDkgNy41NTg3MUMyNC45ODQ5IDcuNTU4NzEgMjUuNDYyOSA2Ljg2MDEyIDI1LjY0NjcgNi44OTY5NVpNMTkuNDcwMyA5LjEwMjhMMjIuMzM3OSA4LjIyMDQ2QzIyLjMzNzkgOC4yMjA0NiAyMy4zMTUzIDcuODAxMzUgMjMuNDQwOCA4LjY2MTYzQzIzLjU2NjMgOS41MjE5MSAyMy40NDA4IDEzLjI5MzkgMjMuNDQwOCAxMy4yOTM5QzIzLjQ0MDggMTMuMjkzOSAyMy4zNTI2IDEzLjg2NzQgMjIuOTk5NiAxMy45NTU3QzIyLjY0NjcgMTQuMDQzOSAxOS42OTA5IDE0LjgzOCAxOS42OTA5IDE0LjgzOEMxOS42OTA5IDE0LjgzOCAxOC44MzA2IDE0Ljk3MDQgMTguODA4NSAxMy4yOTM5QzE4Ljc4NjUgMTEuNjE3NSAxOC44MDg1IDkuOTg1MTQgMTguODA4NSA5Ljk4NTE0QzE4LjgwODUgOS45ODUxNCAxOS4yNDk3IDkuMDI5MzQgMTkuNDcwMyA5LjEwMjhaTTE1LjcyMDQgOS45ODUxNEgxNi44MjMzQzE2LjgyMzMgOS45ODUxNCAxNy4yNzU5IDkuODMyMDUgMTcuMjY0NCAxMS4wODgxQzE3LjI1MjMgMTIuNDA3NiAxNy4yNjQ0IDE0LjgzOCAxNy4yNjQ0IDE0LjgzOEMxNy4yNjQ0IDE0LjgzOCAxNi42OTc4IDE2LjE4MzYgMTUuMjc5MiAxNS4yNzkyQzE1LjE4NDEgMTMuOTcxNSAxNS4yNzkyIDEwLjg2NzUgMTUuMjc5MiAxMC44Njc1QzE1LjI3OTIgMTAuODY3NSAxNS4yMDA0IDEwLjEyMTcgMTUuNzIwNCA5Ljk4NTE0Wk04LjAyNTY5IDEzLjI4OTNMOC4yMTQwNyAxNi44Njg5QzguMjE0MDcgMTYuODY4OSA3LjY5ODc4IDE4LjA4MDIgNi43MDY4MiAxNy4yNDU3QzYuNjg4NTEgMTYuNzI1NSA2LjcwNjgyIDEzLjY2NiA2LjcwNjgyIDEzLjY2NkM2LjcwNjgyIDEzLjY2NiA3LjE3Nzk5IDEyLjU5ODQgOC4wMjU2OSAxMy4yODkzWk05LjMyMzM5IDEyLjQxMTZMMTAuNjQ2OSAxMi4xOTFDMTAuNjQ2OSAxMi4xOTEgMTEuMzY3MSAxMi4xMzg1IDExLjMwODcgMTIuNjMyMkMxMS4yNTAyIDEzLjEyNTggMTEuMzA4NyAxNS45NDA5IDExLjMwODcgMTUuOTQwOUMxMS4zMDg3IDE1Ljk0MDkgMTAuODIyIDE2LjQ1OTUgMTAuNDI2MyAxNi44MjMzQzkuNzg0NjMgMTYuNzA1OSA4Ljk3NzI5IDE3LjA2NTkgOC44ODIyMiAxNi4zODIxQzguOTM0MDYgMTYuNDM0NiA4Ljg4MjIyIDEzLjI5MzkgOC44ODIyMiAxMy4yOTM5QzguODgyMjIgMTMuMjkzOSA5LjEwMjgxIDEyLjM3NDcgOS4zMjMzOSAxMi40MTE2Wk00LjQ3MDUzIDE3LjI2NDRDNC40NDg0NyAxNi43NjU1IDQuNDcwNTMgMTQuMTc2MiA0LjQ3MDUzIDE0LjE3NjJDNC40NzA1MyAxNC4xNzYyIDUuMTE3MDYgMTMuMjc4IDUuNTczNDUgMTQuMTc2MkM1LjYxNjI0IDE1LjA3NDUgNS41NzM0NSAxNy4yNjQ0IDUuNTczNDUgMTcuMjY0NEM1LjU3MzQ1IDE3LjI2NDQgNS4xNTk4NSAxOC44OTEyIDQuNDcwNTMgMTcuMjY0NFpNMy4xNDcwMiAxNC4xNzYyQzMuMTQ3MDIgMTQuMTc2MiAzLjcyMDU0IDEzLjY4MjYgMy44MDg3NyAxNS4yNzkyQzMuODczMTQgMTYuMTY3NiAzLjc5ODcyIDE3LjA2MDcgMy41ODgxOSAxNy45MjYyQzMuNTg4MTkgMTcuOTI2MiAyLjk4NDY3IDE4LjQyNTEgMi43MDU4NSAxNy45MjYyQzIuNjQ3MzkgMTcuNDY0MSAyLjQ4NTI2IDEzLjkxODggMy4xNDcwMiAxNC4xNzYyWk0yMC41NzMyIDIxLjQ1NTVDMjAuNTczMiAyMS40NTU1IDI2LjMzMDUgMjEuMDcyMiAyNi41MjkgMjEuMDE0NEMyNi43Mjc1IDIwLjk1NjYgMjcuMTkwOCAyMS4yMzUgMjcuMTkwOCAyMS4yMzVMMjcuNjMxOSAyMS44OTY3VjIyLjMzNzlDMjcuNjMxOSAyMi4zMzc5IDI4LjE3NjggMjMuNTY1NCAyNi4wODc4IDIzLjg4MkMyNS4xMzggMjMuMzY0NyAyNC43NDM2IDIzLjcxOTggMjQuNzY0MyAyMi4zMzc5QzI0LjczMzIgMjIuMjMzNSAyNC42NzY1IDIyLjEzODUgMjQuNTk5NSAyMi4wNjE1QzI0LjUyMjUgMjEuOTg0NSAyNC40Mjc1IDIxLjkyNzkgMjQuMzIzMiAyMS44OTY3SDIzLjQ0MDhDMjMuNDQwOCAyMS44OTY3IDIzLjQ2MjkgMjQuMDE0MyAyMS40NTU2IDIzLjg4MkMyMC41MzExIDIzLjY2MTQgMjAuNDg1IDIyLjU4MDUgMjAuNTczMiAyMi4zMzc5QzIwLjYxOTUgMjIuMDQ1NiAyMC42MTk1IDIxLjc0NzggMjAuNTczMiAyMS40NTU1Wk0xLjM4MjM0IDE1LjA1ODZDMS4zODIzNCAxNS4wNTg2IDEuNTM5NCAxNC4yOTg5IDEuODIzNTEgMTUuMDU4NkMyLjEwNzYyIDE1LjgxODMgMS44MjM1MSAxOC4xNDY4IDEuODIzNTEgMTguMTQ2OEMxLjgyMzUxIDE4LjE0NjggMS4zMTg4MSAxOC43NDcyIDEuMTYxNzUgMTcuOTI2MkMxLjMzNTU4IDE3LjUwOTUgMS4zODIzNCAxNS4wNTg2IDEuMzgyMzQgMTUuMDU4NlpNMTQuMTc2MyAxMS4wODgxTDE0LjM5NjggMTUuMjc5MkMxNC4zOTY4IDE1LjI3OTIgMTMuNzkzNSAxNi42OTcxIDEyLjYzMjIgMTUuNzIwM0MxMi42MTAxIDE1LjExMTEgMTIuNjMyMiAxMS41MjkyIDEyLjYzMjIgMTEuNTI5MkMxMi42MzIyIDExLjUyOTIgMTMuMTgzNiAxMC4yNzkyIDE0LjE3NjMgMTEuMDg4MVpNMTQuMTc2MyAxMS4wODgxTDE0LjM5NjggMTUuMjc5MkMxNC4zOTY4IDE1LjI3OTIgMTMuNzkzNSAxNi42OTcxIDEyLjYzMjIgMTUuNzIwM0MxMi42MTAxIDE1LjExMTEgMTIuNjMyMiAxMS41MjkyIDEyLjYzMjIgMTEuNTI5MkMxMi42MzIyIDExLjUyOTIgMTMuMTgzNiAxMC4yNzkyIDE0LjE3NjMgMTEuMDg4MVpNMTQuMTc2MyAxMS4wODgxTDE0LjM5NjggMTUuMjc5MkMxNC4zOTY4IDE1LjI3OTIgMTMuNzkzNSAxNi42OTcxIDEyLjYzMjIgMTUuNzIwM0MxMi42MTAxIDE1LjExMTEgMTIuNjMyMiAxMS41MjkyIDEyLjYzMjIgMTEuNTI5MkMxMi42MzIyIDExLjUyOTIgMTMuMTgzNiAxMC4yNzkyIDE0LjE3NjMgMTEuMDg4MVoiIGZpbGw9IiNFNkU2QkYiLz4KPC9nPgo8L2c+Cjwvc3ZnPgo=" />
            <div className="link__vector"></div>
            <p className="link__title">SHIBUYA STATION</p>
          </NavLink>
        </li>

        {/* Barra de búsqueda */}
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

        {/* Si no hay usuario, mostrar Login y Register */}
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

        {/* Si hay un usuario, mostrar Profile y Logout */}
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

        {/* Enlaces a Library y Notifications */}
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
