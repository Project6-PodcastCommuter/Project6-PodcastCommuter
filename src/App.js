import React, { Component } from 'react';
import './App.scss';
import axios from 'axios';
import Map from './Map.js'
import Podcast from './Podcast';


class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      appTime: 0,
    }
  }
  

  grabCommunteTime = (time) => {
    this.setState({
      appTime: time
    }, () => {
      console.log('from app', this.state.appTime)
    })
  }

  render(){
    return(
      <div>
        <Map grabCommunteTime={this.grabCommunteTime}/>
        <Podcast time={this.state.appTime} />
      </div>
    )
  }
}

export default App;


