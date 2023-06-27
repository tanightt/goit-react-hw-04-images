import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { styled } from 'styled-components';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { fetchGallery } from 'services/api';

export class App extends Component {
  state = {
    gallery: [],
    loading: false,
    searchValue: '',
    page: 1,
    showModal: false,
    selectedImage: '',
    alt: null,
  };
  cardTotal = null;

  componentDidUpdate(_, prevState) {
    const { searchValue, page } = this.state;
    if (prevState.searchValue !== searchValue || prevState.page !== page) {
      this.handleFetchGallery(searchValue, page);
    }
  }

  handleFetchGallery = async (searchValue, page) => {
    this.setState({ loading: true });
    try {
      const response = await fetchGallery(searchValue, page);
      const { hits, totalHits } = response;
      const cardData = hits;
      this.cardTotal = totalHits;
      this.setState(({ gallery }) => ({
        gallery: [...gallery, ...cardData],
      }));
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({ loading: false });
    }
  };

  handleSubmit = searchValue => {
    this.setState({ searchValue, gallery: [], page: 1 });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  toggleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
    }));
  };

  handleSelectedImage = (largeImageUrl, tags) => {
    this.setState({
      selectedImage: largeImageUrl,
      alt: tags,
      showModal: true,
    });
  };

  render() {
    const { gallery, loading, page, showModal, selectedImage, alt } =
      this.state;
    const { handleSubmit, handleLoadMore, toggleModal } = this;
    return (
      <AppContainer>
        <Searchbar onSubmit={handleSubmit} />
        {loading && <Loader />}

        <ImageGallery
          gallery={gallery}
          selectedImage={this.handleSelectedImage}
        />
        {gallery.length !== 0 && page < Math.ceil(this.cardTotal / 12) && (
          <Button onClick={handleLoadMore} />
        )}
        {showModal && (
          <Modal
            selectedImage={selectedImage}
            tags={alt}
            onClick={toggleModal}
          />
        )}
      </AppContainer>
    );
  }
}

export default App;

const AppContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 16px;
  padding-bottom: 24px;
`;
