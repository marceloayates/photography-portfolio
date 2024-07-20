import React, { useState, useEffect } from 'react';
import styles from '../styles/CarouselView.module.css';

const CarouselView = ({
  photos,
  activePhotoIndex,
  handlePrevPhoto,
  handleNextPhoto,
  toggleGridView,
}) => {
  const [key, setKey] = useState(0);
  const activePhoto = photos[activePhotoIndex];

  useEffect(() => {
    setKey(prevKey => prevKey + 1);
  }, [activePhotoIndex]);

  return (
    <div className={styles.carouselView}>
      {activePhoto && (
        <>
          <img
            key={key}
            src={activePhoto.url}
            alt={activePhoto.category}
            className={styles.photoImage}
          />
          <p className={styles.subtitleText}>{activePhoto.subtitle}</p>
        </>
      )}
    </div>
  );
};

export default CarouselView;
