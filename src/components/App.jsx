import React, { Component } from 'react';
import axios from 'axios';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { styled } from 'styled-components';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

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

  async componentDidMount() {
    const { searchValue, page } = this.state;
    await this.handleFetchGallery(searchValue, page);
  }

  async componentDidUpdate(_, prevState) {
    const { searchValue, page } = this.state;
    if (prevState.searchValue !== searchValue || prevState.page !== page) {
      await this.handleFetchGallery(searchValue, page);
    }
  }

  handleFetchGallery = async (searchValue, page) => {
    if (!searchValue) {
      return;
    }

    this.setState({ loading: true });
    try {
      const response = await axios.get('https://pixabay.com/api/', {
        params: {
          q: searchValue,
          page: page,
          key: '37045693-8aefe551e2e8551a000bf542b',
          image_type: 'photo',
          orientation: 'horizontal',
          per_page: 12,
        },
      });
      const cardData = response.data.hits;
      this.setState(({ gallery }) => ({
        gallery: [...gallery, ...cardData],
        loading: false,
      }));
    } catch (error) {
      console.error(error);
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
    const { gallery, loading, showModal, selectedImage, alt } = this.state;
    const { handleSubmit, handleLoadMore, toggleModal } = this;
    return (
      <AppContainer>
        <Searchbar onSubmit={handleSubmit} />
        {loading && <Loader />}

        <ImageGallery
          gallery={gallery}
          selectedImage={this.handleSelectedImage}
        />
        {gallery.length !== 0 && <Button onClick={handleLoadMore} />}
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
