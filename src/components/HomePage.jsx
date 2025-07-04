import React, { useState, useEffect } from 'react';
import photoDataManager from '../utils/PhotoDataManager';
import styles from '../styles/HomePage.module.css';

const HomePage = () => {
  const [homepageImageURL, setHomepageImageURL] = useState('');

  useEffect(() => {
    const loadHomepageImage = () => {
      const imageUrl = photoDataManager.getHomepageImage();
      setHomepageImageURL(imageUrl);
    };

    loadHomepageImage();

    // Listen for storage changes (when homepage image is updated)
    const handleStorageChange = (e) => {
      if (e.key === 'photography-portfolio-homepage-image') {
        loadHomepageImage();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <div className={styles.homepageContainer}>
      <img className={styles.homepageImage} src={homepageImageURL} alt="Homepage" />
    </div>
  );
};

export default HomePage;
