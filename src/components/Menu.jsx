import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../styles/Menu.module.css';
import { FaInstagram, FaBars } from 'react-icons/fa';

const Menu = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div>
      <div className={styles.desktopMenu}>
        <nav className={styles.tabs}>
          <NavLink to="/abstract" className={({ isActive }) => isActive ? `${styles.tabs} ${styles.active}` : styles.tabs}>
            Abstract
          </NavLink>
          {/* <NavLink to="/places" className={({ isActive }) => isActive ? `${styles.tabs} ${styles.active}` : styles.tabs}>
            Places
          </NavLink> */}
          <NavLink to="/monochrome" className={({ isActive }) => isActive ? `${styles.tabs} ${styles.active}` : styles.tabs}>
            Monochrome
          </NavLink>
          <NavLink to="/people" className={({ isActive }) => isActive ? `${styles.tabs} ${styles.active}` : styles.tabs}>
            People
          </NavLink>
          <NavLink to="/portraits" className={({ isActive }) => isActive ? `${styles.tabs} ${styles.active}` : styles.tabs}>
            Portraits
          </NavLink>
          <NavLink to="/studio" className={({ isActive }) => isActive ? `${styles.tabs} ${styles.active}` : styles.tabs}>
            Studio
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? `${styles.tabs} ${styles.active}` : styles.tabs}>
            About
          </NavLink>
        </nav>
        <div>
          <a href="https://www.instagram.com/shots.by.marcelo" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={24} />
          </a>
          <p style={{ color: 'black', fontSize: '0.8rem', fontStyle: 'italic' }}>
            © Copyright Marcelo Yates 2024
          </p>
        </div>
      </div>

      <div className={styles.mobileMenu}>
        <FaBars size={24} onClick={toggleMobileMenu} />
        {isMobileMenuOpen && (
          <div className={styles.mobileMenuOverlay} onClick={closeMobileMenu}>
            <div className={styles.mobileMenuContent} onClick={(e) => e.stopPropagation()}>
              <nav className={styles.mobileMenuTabs}>
                <NavLink to="/Abstract" className={styles.mobileMenuTab} onClick={closeMobileMenu}>
                  Abstract
                </NavLink>
                <NavLink to="/landscape" className={styles.mobileMenuTab} onClick={closeMobileMenu}>
                  Landscape
                </NavLink>
                <NavLink to="/monochrome" className={styles.mobileMenuTab} onClick={closeMobileMenu}>
                  Monochrome
                </NavLink>
                <NavLink to="/portraits" className={styles.mobileMenuTab} onClick={closeMobileMenu}>
                  Portraits
                </NavLink>
                <NavLink to="/about" className={styles.mobileMenuTab} onClick={closeMobileMenu}>
                  About
                </NavLink>
              </nav>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
