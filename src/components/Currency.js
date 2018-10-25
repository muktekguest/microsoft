import React, { Component } from 'react';

import PubSub from 'pubsub-js';

class Currency extends Component {
  onRemove = fav => {
    PubSub.publish('updateState', fav);
  }

  render() {
    return (
      <li
        className='Currency-item'
      >
        <p className='Currency-key'>{ this.props.item.asset_id }</p>
        <span className='Currency-name'>{ this.props.item.name }</span>
        <button
          className='Currency-button'
          onClick={ () => this.onRemove(this.props.item) } >
          <i className='fa fa-trash' />
        </button>
      </li>
    );
  }
}

export default Currency;
