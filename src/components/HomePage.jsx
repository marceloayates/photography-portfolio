import React from 'react';
// import homepageImage from '../assets/homepage-image.jpg'; // Import your homepage image
import styles from '../styles/HomePage.module.css';

const homepageImageURL = "https://res.cloudinary.com/dajuvlxyu/image/upload/v1720063428/homepage-image_rxjzm5.jpg"

const HomePage = () => {
  return (
    <div className={styles.homepageContainer}>
      <img className={styles.homepageImage} src={homepageImageURL} alt="Homepage" />
    </div>
  );
};

export default HomePage;
