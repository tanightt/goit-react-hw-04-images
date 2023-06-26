import PropTypes from 'prop-types';
import { GalleryList } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ gallery, selectedImage }) => {
  return (
    <GalleryList>
      {gallery.map(({ webformatURL, tags, largeImageURL }) => (
        <ImageGalleryItem
          key={crypto.randomUUID()}
          previewImg={webformatURL}
          tags={tags}
          selectedImage={() => selectedImage(largeImageURL, tags)}
        />
      ))}
    </GalleryList>
  );
};

ImageGallery.propTypes = {
  gallery: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedImage: PropTypes.func,
};
