import React, { Component } from 'react';

import PubSub from 'pubsub-js';

import Favourites from './components/Favourites';

import './App.css';

const API_KEY = '8FAE58E7-4FDC-4356-A610-1D16EAFC9296';
const API_URL = 'https://rest.coinapi.io/v1/assets';

class App extends Component {
  constructor() {
    super();
    
    this.state = {
      currencies: [],
      favourites: []
    };
  }
  componentDidMount = () => {
    fetch(`${API_URL}?apikey=${API_KEY}`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.setState({ currencies: data })
      });

      PubSub.subscribe('updateState', (evtName, data) => {
        console.log('---------------- `updateState` ---------------')
        console.log({
          eventName: evtName,
          data
        })
        this.removeFromFavourites(data);
      });
  }
  
  removeFromFavourites = currency => {
    //console.log('removing...', currency.asset_id);
    
    const newCurrencies = this.state.favourites.filter(c => c.asset_id !== currency.asset_id);
    
    this.setState({
      favourites: newCurrencies
    })
  }
  
  addToFavourites = currency => {
    console.log(currency);
    
    this.setState({
      favourites: [
        ...this.state.favourites,
        currency
      ]
    });
  }
  
  render() {
    return (
      <React.Fragment>
        <div className='Grid'>
          <div className='Grid-column'>
            <h2>Assets</h2>
            <ul className='Currency'>
              { this.state.currencies.map(currency => (
                  <li
                    className='Currency-item'
                    key={ currency.asset_id }
                    onClick={ () => this.addToFavourites(currency) }
                  >
                    <p className='Currency-key'>{ currency.asset_id }</p>
                    <span className='Currency-name'>{ currency.name }</span>
                  </li>
              )) }
            </ul>
          </div>
          <div className='Grid-column'>
            <Favourites
              onRemove={ this.removeFromFavourites }
              favorites={ this.state.favourites } />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
