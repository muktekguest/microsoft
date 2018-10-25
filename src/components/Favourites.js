import React, { Component } from 'react';

import CurrencyList from './CurrencyList';

class Favourites extends Component {
  render() {
    return (
      <React.Fragment>
        <h2>Favorites Currencies</h2>
        <CurrencyList
          onRemove={ this.props.onRemove }
          favorites={ this.props.favorites } />
      </React.Fragment>
    );
  }
}

export default Favourites;
