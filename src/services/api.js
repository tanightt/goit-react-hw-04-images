import axios from 'axios';

export const fetchGallery = async (searchValue, page) => {
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
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
