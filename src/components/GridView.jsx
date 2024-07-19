import React from 'react';
import styles from '../styles/GridView.module.css';

const GridView = ({ photos, handleGridImageClick, toggleGridView }) => {
  const getRandomPosition = () => {
    const positions = ['top', 'right', 'bottom', 'left'];
    const randomIndex = Math.floor(Math.random() * positions.length);
    const randomOffset = Math.floor(Math.random() * 10) + 'px'; // Generates a random offset between 0-10px
    return { position: positions[randomIndex], offset: randomOffset };
  };

  return (
    <div>
      <div className={styles.gridContainer}>
        {photos.map((photo) => {
          const randomPosition = getRandomPosition();
          return (
            <div
              key={photo.id}
              className={styles.gridItem}
              onClick={() => handleGridImageClick(photo)}
            >
              <img
                className={styles.gridImage}
                src={photo.url}
                alt={photo.category}
                style={{
                  [randomPosition.position]: randomPosition.offset,
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GridView;
