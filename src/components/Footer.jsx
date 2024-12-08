import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Footer component that displays links to various sections of the site.
 * @component
 */
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <Link to="/contact">Contacto</Link> {/* Link to the contact page */}
          <a href="#terminos">Términos y Condiciones</a> {/* Link to the terms and conditions section */}
          <a href="#privacidad">Política de Privacidad</a> {/* Link to the privacy policy section */}
          <a href="#faq">FAQ</a> {/* Link to the FAQ section */}
        </div>
      </div>
    </footer>
  );
}

export default Footer;