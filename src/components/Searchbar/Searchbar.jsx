import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  SearchButton,
  SearchLabel,
  SearchForm,
  SearchHeader,
  SearchInput,
} from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    searchValue: '',
  };

  handleChange = e => {
    this.setState({ searchValue: e.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.searchValue);
    this.setState({ searchValue: '' });
  };

  render() {
    return (
      <SearchHeader>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchButton type="submit">
            <SearchLabel>Search</SearchLabel>
          </SearchButton>

          <SearchInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchValue}
            onChange={this.handleChange}
          />
        </SearchForm>
      </SearchHeader>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
