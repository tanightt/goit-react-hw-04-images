import PropTypes from 'prop-types';

import {
  SearchButton,
  SearchLabel,
  SearchForm,
  SearchHeader,
  SearchInput,
} from './Searchbar.styled';

export const Searchbar = onSubmit => {
  return (
    <SearchHeader>
      <SearchForm>
        <SearchButton type="submit">
          <SearchLabel>Search</SearchLabel>
        </SearchButton>

        <SearchInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchHeader>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
