import React, { useState } from 'react';
import NavigationControls from './NavigationControls';
import CarouselView from './CarouselView';
import GridView from './GridView';
import Modal from './Modal';

const GalleryPage = ({ title, photos }) => {
    const [activePhotoIndex, setActivePhotoIndex] = useState(0);
    const [isGridView, setIsGridView] = useState(false);

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
        <div>
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
        {showModal && (
          <Modal activePhoto={activePhoto} toggleModal={toggleModal} />
        )}
      </div>
    );
};

export default GalleryPage;
