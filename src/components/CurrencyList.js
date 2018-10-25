import React, { Component } from 'react';

import Currency from './Currency';

class CurrencyList extends Component {
  render() {
    return (
      <ul className='Currency'>
        { this.props.favorites.map(fav => (
            <Currency key={ fav.asset_id } item={ fav } />
          )) }
      </ul>
    );
  }
}

export default CurrencyList;
