import React from 'react';
import { FaThLarge, FaTimes } from 'react-icons/fa';
import styles from '../styles/NavigationControls.module.css';

const NavigationControls = ({
  handlePrevPhoto,
  handleNextPhoto,
  activePhotoIndex,
  totalPhotos,
  toggleGridView,
  isGridView
}) => {
  return (
    <div className={styles.navigationContainer}>
      <span className={styles.navigationLink} onClick={handlePrevPhoto}>Previous</span>
      <span className={styles.navigationLink} onClick={handleNextPhoto}>Next</span>
      <span className={styles.imageIndexText}>
        {activePhotoIndex + 1} out of {totalPhotos}
      </span>
      <span className={styles.gridToggleIcon} onClick={toggleGridView}>{isGridView ? <FaTimes /> : <FaThLarge />}</span>
    </div>
  );
};

export default NavigationControls;
