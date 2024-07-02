import React from 'react';
import styles from '../styles/Modal.module.css';

const Modal = ({ activePhoto, toggleModal }) => {
  const handleKeyDown = (e, toggleModal) => {
    if (e.key === 'Escape') {
      toggleModal();
    }
  };

  React.useEffect(() => {
    document.addEventListener('keydown', (e) => handleKeyDown(e, toggleModal));
    return () => {
      document.removeEventListener('keydown', (e) => handleKeyDown(e, toggleModal));
    };
  }, [toggleModal]);

  return (
    <div
      className={styles.overlay}
      onClick={toggleModal}
    >
      <div
        className={styles.content}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={activePhoto.url}
          alt={activePhoto.category}
          className={styles.image}
        />
      </div>
    </div>
  );
};

export default Modal;
