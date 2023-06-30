import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { ModalWindow, Overlay } from './Modal.styled';

export const Modal = ({ selectedImage, tags, onClick }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClick();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClick]);

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClick();
    }
  };

  return (
    <Overlay onClick={handleBackdropClick}>
      <ModalWindow>
        <img src={selectedImage} alt={tags} />
      </ModalWindow>
    </Overlay>
  );
};

Modal.propTypes = {
  selectedImage: PropTypes.string,
  tags: PropTypes.string,
  onClick: PropTypes.func,
};
