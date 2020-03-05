import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';
import axios from 'axios';

class Podcast extends Component{
  constructor(){
    super();

    this.state={
      keyword: '',
    }
  }

  componentDidMount(){
    axios({
      url: `https://listen-api.listennotes.com/api/v2/search`,
      method: `GET`,
      headers: { 'X-ListenAPI-Key': 'efedd950b2d84805a5c9ede9b4543e23' },
      dataResponse: `jsonp`,
      params: {
        q: 'star',
        type: "podcast"
      }
    }).then((data) => {
      console.log(data)
    });
  }

  render(){
    return(
      <div className="podcastContent">
        <div>Hi</div>
        <h1>Testing</h1>
      </div>
    )
  }
}

class Map extends Component{
  constructor(){
    super()
    this.state={
      start: '',
      end: '',
    }
  }

  componentDidMount(){
    axios({
      url: 'http://www.mapquestapi.com/directions/v2/route',
      params: {
        key: 'PgwvbKwVwtViQRmH4Rju1Xri2DmysmKb',
        from: '5 St Joseph Street, Toronto',
        to: '483 Queen St W, Toronto',
        routeType: 'pedestrian'
      }
    }).then(response => {
      console.log(response)
    })
  }
  
  render(){
    return(
      <div className="mapContent">
        <h1>Map testing</h1>
      </div>
    )
  }
}


class App extends Component{
  render(){
    return (
      <div className="App">
        <Podcast />
        <Map />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            BEST GROUP!🙌
          </a>
        </header>
      </div>
    );
  }
}

export default App;
