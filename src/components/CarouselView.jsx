import React from 'react';
import NavigationControls from './NavigationControls';
import styles from '../styles/CarouselView.module.css';

const CarouselView = ({
  photos,
  activePhotoIndex,
  handlePrevPhoto,
  handleNextPhoto,
  toggleGridView,
}) => {
  const activePhoto = photos[activePhotoIndex];

  return (
    <div className={styles.carouselView}>
      <NavigationControls
        handlePrevPhoto={handlePrevPhoto}
        handleNextPhoto={handleNextPhoto}
        activePhotoIndex={activePhotoIndex}
        totalPhotos={photos.length}
        toggleGridView={toggleGridView}
      />
      {activePhoto && (
        <>
          <img src={activePhoto.url} alt={activePhoto.category} className={styles.photoImage} />
          <p className={styles.subtitleText}>{activePhoto.subtitle}</p>
        </>
      )}
    </div>
  );
};

export default CarouselView;
