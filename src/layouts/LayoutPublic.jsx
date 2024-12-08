import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

/**
 * LayoutPublic component that provides a public layout with a navbar, footer, and dynamic content.
 * @component
 * @returns {JSX.Element} The LayoutPublic component.
 */
function LayoutPublic() {
  return (
    <div className="layout">
      <Navbar />
      <main className="content">
        <Outlet /> {/* Element that renders the matched child route */}
      </main>
      <Footer />
    </div>
  );
}

export default LayoutPublic;