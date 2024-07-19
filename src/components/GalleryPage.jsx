import React, { useState, useEffect } from 'react';
import NavigationControls from './NavigationControls';
import CarouselView from './CarouselView';
import GridView from './GridView';
import Modal from './Modal';
import '../styles/GalleryPage.module.css';

const GalleryPage = ({ title, photos }) => {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [isGridView, setIsGridView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Reset activePhotoIndex whenever the photos prop changes
    setActivePhotoIndex(0);

    // Check if the user is on a mobile device
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint as needed
    };

    handleResize(); // Check on initial load
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [photos]);

  const handlePrevPhoto = () => {
    setActivePhotoIndex((prevIndex) => (prevIndex === 0 ? photos.length - 1 : prevIndex - 1));
  };

  const handleNextPhoto = () => {
    setActivePhotoIndex((prevIndex) => (prevIndex === photos.length - 1 ? 0 : prevIndex + 1));
  };

  const activePhoto = photos[activePhotoIndex];

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal((prevState) => !prevState);
  };

  const toggleGridView = () => {
    setIsGridView((prevState) => !prevState);
  };

  const handleGridImageClick = (photo) => {
    setActivePhotoIndex(photos.indexOf(photo));
    toggleModal();
  };

  return (
    <div className="gallery-page">
      {!isMobile && (
        <>
          <NavigationControls
            handlePrevPhoto={handlePrevPhoto}
            handleNextPhoto={handleNextPhoto}
            activePhotoIndex={activePhotoIndex}
            totalPhotos={photos.length}
            toggleGridView={toggleGridView}
            isGridView={isGridView}
          />
          {isGridView ? (
            <GridView
              photos={photos}
              handleGridImageClick={handleGridImageClick}
              toggleGridView={toggleGridView}
            />
          ) : (
            <CarouselView
              photos={photos}
              activePhotoIndex={activePhotoIndex}
              handlePrevPhoto={handlePrevPhoto}
              handleNextPhoto={handleNextPhoto}
              toggleGridView={toggleGridView}
            />
          )}
        </>
      )}
      {isMobile && (
        <div>
          {photos.map((photo) => (
            <img
              key={photo.id}
              src={photo.url}
              alt={photo.category}
              style={{ maxWidth: '100%', display: 'block', marginBottom: '1rem', marginTop: '1rem'}}
            />
          ))}
        </div>
      )}
      {!isMobile && showModal && <Modal activePhoto={activePhoto} toggleModal={toggleModal} />}
    </div>
  );
};

export default GalleryPage;
