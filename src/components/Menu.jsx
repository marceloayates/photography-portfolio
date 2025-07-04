import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styles from '../styles/Menu.module.css';
import { FaInstagram, FaBars, FaUser } from 'react-icons/fa';

const Menu = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();

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
          <NavLink to="/special_projects" className={({ isActive }) => isActive ? `${styles.tabs} ${styles.active}` : styles.tabs}>
            <h2>Special Projects</h2>
          </NavLink>
          <NavLink to="/abstract" className={({ isActive }) => isActive ? `${styles.tabs} ${styles.active}` : styles.tabs}>
            <h2>Abstract</h2>
          </NavLink>
          <NavLink to="/monochrome" className={({ isActive }) => isActive ? `${styles.tabs} ${styles.active}` : styles.tabs}>
            <h2>Monochrome</h2>
          </NavLink>
          <NavLink to="/people" className={({ isActive }) => isActive ? `${styles.tabs} ${styles.active}` : styles.tabs}>
            <h2>People</h2>
          </NavLink>
          <NavLink to="/studio" className={({ isActive }) => isActive ? `${styles.tabs} ${styles.active}` : styles.tabs}>
            <h2>Studio</h2>
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? `${styles.tabs} ${styles.active}` : styles.tabs}>
            <h2>About</h2>
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? `${styles.tabs} ${styles.active}` : styles.tabs}>
            <h2>Contact</h2>
          </NavLink>
        </nav>
        <div>
          <div className={styles.iconContainer}>
            <a href="https://www.instagram.com/shots.by.marcelo" target="_blank" rel="noopener noreferrer">
              <FaInstagram size={24} />
            </a>
            <NavLink to={isAuthenticated ? "/admin" : "/login"} className={styles.adminIcon}>
              <FaUser size={20} />
            </NavLink>
          </div>
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
              <nav className={`${styles.mobileMenuTabs} ${styles.tabs}`}>
                <NavLink to="/special_projects" className={({ isActive }) => isActive ? `${styles.tabs} ${styles.active}` : styles.tabs} onClick={closeMobileMenu}>
                  Special Projects
                </NavLink>
                <NavLink to="/abstract" className={({ isActive }) => isActive ? `${styles.tabs} ${styles.active}` : styles.tabs} onClick={closeMobileMenu}>
                  Abstract
                </NavLink>
                <NavLink to="/monochrome" className={({ isActive }) => isActive ? `${styles.tabs} ${styles.active}` : styles.tabs} onClick={closeMobileMenu}>
                  Monochrome
                </NavLink>
                <NavLink to="/people" className={({ isActive }) => isActive ? `${styles.tabs} ${styles.active}` : styles.tabs} onClick={closeMobileMenu}>
                  People
                </NavLink>
                <NavLink to="/studio" className={({ isActive }) => isActive ? `${styles.tabs} ${styles.active}` : styles.tabs} onClick={closeMobileMenu}>
                  Studio
                </NavLink>
                <NavLink to="/about" className={({ isActive }) => isActive ? `${styles.tabs} ${styles.active}` : styles.tabs} onClick={closeMobileMenu}>
                  About
                </NavLink>
                <NavLink to="/contact" className={({ isActive }) => isActive ? `${styles.tabs} ${styles.active}` : styles.tabs} onClick={closeMobileMenu}>
                  Contact
                </NavLink>
                <NavLink to={isAuthenticated ? "/admin" : "/login"} className={styles.adminLink} onClick={closeMobileMenu}>
                  <FaUser size={16} /> Admin
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
