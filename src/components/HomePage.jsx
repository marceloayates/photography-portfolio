import React from 'react';
import homepageImage from '../assets/homepage-image.jpg'; // Import your homepage image
import styles from '../styles/HomePage.module.css';

const HomePage = () => {
  return (
    <div className={styles.homepageContainer}>
      <img className={styles.homepageImage} src={homepageImage} alt="Homepage" />
    </div>
  );
};

export default HomePage;
