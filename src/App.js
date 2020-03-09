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
      userInput: '',
      appTime: 0,
      podResponse: [],
      flag: false,
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

  // // Fun Function to grab podcast axios response on form submit
  // grabPodcastAxios = (data) => {
  //   this.setState({
  //     podResponse: data,
  //   }, () => {
  //   })
  // }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      flag: true,
    })
  }

  // Saving podcast search keyword
  handleChange = (e) => {
    this.setState({
      userInput: e.target.value,
    }, () => {
    })
  }

  // Importing components and vital information for app to run
  render(){
    return(
      <div>
        {/* <form onSubmit={this.handleSubmit}> */}
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            className="podcastSearch"
            placeholder='Search'
            onChange={this.handleChange}
            value={this.state.userInput}>
          </input>
          <button type="submit" value='submit'>Search</button>
        </form>
        <Map grabCommunteTime={this.grabCommunteTime}/>
        <Podcast 
        time={this.state.appTime} 
        userInput={this.state.userInput}
        flag={this.state.flag}
        />
      </div>
    )
  }
}

export default App;


