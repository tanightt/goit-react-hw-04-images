import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  SearchButton,
  SearchLabel,
  SearchForm,
  SearchHeader,
  SearchInput,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleChange = e => {
    setSearchValue(e.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(searchValue);
    setSearchValue('');
  };

  return (
    <SearchHeader>
      <SearchForm onSubmit={handleSubmit}>
        <SearchButton type="submit">
          <SearchLabel>Search</SearchLabel>
        </SearchButton>

        <SearchInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchValue}
          onChange={handleChange}
        />
      </SearchForm>
    </SearchHeader>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
