import React, { Component } from 'react';
import './App.scss';
import axios from 'axios';
import Map from './Map.js'
import Podcast from './Podcast';


// App holds all components and elements vital to structure of the page

class App extends Component {
  constructor(props){
    super(props);
// Setting state for user selected commute time from Map.js to pass to Podcast.js
    this.state = {
      appTime: 0,
    }
  }
  

// Function to grab commute time from Map.js
// Function is called in Map.js
  grabCommunteTime = (time) => {
    this.setState({
      appTime: time
    }, () => {
    })
  }

  // Importing components and vital information for app to run
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


