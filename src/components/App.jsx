import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { fetchGallery } from 'services/api';

export const App = () => {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [alt, setAlt] = useState(null);
  const [cardTotal, setCardTotal] = useState(null);

  useEffect(() => {
    if (searchValue === '') {
      return;
    }
    handleFetchGallery(searchValue, page);
  }, [searchValue, page]);

  const handleFetchGallery = async (searchValue, page) => {
    setLoading(true);
    try {
      const response = await fetchGallery(searchValue, page);
      const { hits, totalHits } = response;
      setGallery(prev => [...prev, ...hits]);
      setCardTotal(totalHits);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = searchValue => {
    setSearchValue(searchValue);
    setGallery([]);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const toggleModal = () => {
    setShowModal(prev => !prev);
  };

  const handleSelectedImage = (largeImageUrl, tags) => {
    setSelectedImage(largeImageUrl);
    setAlt(tags);
    setShowModal(true);
  };

  return (
    <AppContainer>
      <Searchbar onSubmit={handleSubmit} />
      {loading && <Loader />}

      <ImageGallery gallery={gallery} selectedImage={handleSelectedImage} />
      {gallery.length !== 0 && page < Math.ceil(cardTotal / 12) && (
        <Button onClick={handleLoadMore} />
      )}
      {showModal && (
        <Modal selectedImage={selectedImage} tags={alt} onClick={toggleModal} />
      )}
    </AppContainer>
  );
};

const AppContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 16px;
  padding-bottom: 24px;
`;
