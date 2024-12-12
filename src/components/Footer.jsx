import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Footer component that provides links to various sections of the site.
 * @component
 * @returns {JSX.Element} The Footer component.
 */
const Footer = () => {
  return (
    <footer className="footer">
      <section className="footer__content">
        <nav className="footer__links">
          <Link to="/contact" className="footer__link">Contacto</Link> {/* Link to the contact page */}
          <a href="#terminos" className="footer__link">Términos y Condiciones</a> {/* Link to the terms and conditions section */}
          <a href="#privacidad" className="footer__link">Política de Privacidad</a> {/* Link to the privacy policy section */}
          <a href="#faq" className="footer__link">FAQ</a> {/* Link to the FAQ section */}
        </nav>
      </section>
    </footer>
  );
}

export default Footer;