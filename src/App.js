import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';
import axios from 'axios';

class Map extends Component{
  constructor(){
    super();

    this.state={
      start:'',
      end:'',
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
    )
  }
}


function App() {
  return (
    <div className="App">
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

export default App;
