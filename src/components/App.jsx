import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';

export class App extends Component {
  render() {
    return (
      <>
        <Searchbar />
      </>
    );
  }
}

export default App;

/*
 * Стили компонента App
 */
// .App {
//   display: grid;
//   grid-template-columns: 1fr;
//   grid-gap: 16px;
//   padding-bottom: 24px;
// }
