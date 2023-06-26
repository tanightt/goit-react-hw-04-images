import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ModalWindow, Overlay } from './Modal.styled';

export class Modal extends Component {
  static propTypes = {
    selectedImage: PropTypes.string,
    tags: PropTypes.string,
    onClick: PropTypes.func,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClick();
    }
  };

  handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClick();
    }
  };

  render() {
    const { selectedImage, tags } = this.props;
    return (
      <Overlay onClick={this.handleBackdropClick}>
        <ModalWindow>
          <img src={selectedImage} alt={tags} />
        </ModalWindow>
      </Overlay>
    );
  }
}

export default Modal;
