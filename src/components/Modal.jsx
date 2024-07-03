import React from 'react';
import styles from '../styles/Modal.module.css';
import { FaTimes } from 'react-icons/fa';

const Modal = ({ activePhoto, toggleModal }) => {
  return (
    <div className={styles.overlay} onClick={toggleModal}>
      <div onClick={(e) => e.stopPropagation()}>
        <div className={styles.closeIconContainer}>
          <FaTimes className={styles.closeIcon} onClick={toggleModal} />
        </div>
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
