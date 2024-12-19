import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import HamburgerMenu from '../components/HamburguerMenu';
import Footer from '../components/Footer';

/**
 * LayoutPublic component that provides a public layout with a navbar, footer, and dynamic content.
 * @component
 * @returns {JSX.Element} The LayoutPublic component
 */
function LayoutPublic() {
  return (
    <section className="layout-public">
      <header className="layout-public__header">
        <Navbar />
        <HamburgerMenu />
      </header>
      <main className="layout-public__content">
        <Outlet /> {/* Element that renders the matched child route */}
      </main>
      <footer className="layout-public__footer">
        <Footer />
      </footer>
    </section>
  );
}

export default LayoutPublic;