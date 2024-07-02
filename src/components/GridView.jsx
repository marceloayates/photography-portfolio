import React from 'react';
import styles from '../styles/GridView.module.css';

const GridView = ({ photos, handleGridImageClick, toggleGridView }) => {
  return (
    <div className={styles.gridContainer}>
      {photos.map((photo) => (
        <div key={photo.id} onClick={() => handleGridImageClick(photo)}>
          <img className={styles.gridImage} src={photo.url} alt={photo.category}/>
        </div>
      ))}
    </div>
  );
};

export default GridView;
