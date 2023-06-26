import PropTypes from 'prop-types';
import { GalleryImage, GalleryItem } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ previewImg, tags, selectedImage }) => {
  return (
    <GalleryItem>
      <GalleryImage src={previewImg} alt={tags} onClick={selectedImage} />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  previewImg: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  selectedImage: PropTypes.func,
};
