import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../styles/Menu.module.css';
import { FaInstagram } from 'react-icons/fa';

const Tabs = () => {
    return (
        <div>
            <nav className={styles.tabs}>
                <NavLink to="/landscape" className={styles.tabs}>
                    Landscape
                </NavLink>
                <NavLink to="/portraits" className={styles.tabs}>
                    Portraits
                </NavLink>
                <NavLink to="/contact" className={styles.tabs}>
                    Contact
                </NavLink>
                <NavLink to="/about" className={styles.tabs}>
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
    );
};

export default Tabs;
