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
      <div>Hi</div>
      <h1>Testing</h1>
    )
  }
}

class Map extends Component{
  constructor(){
    super()
    this.state={
      
    }
  }
  render(){

  }
}


class App extends Component{
  render(){
    return (
      <div className="App">
        <Podcast />
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
