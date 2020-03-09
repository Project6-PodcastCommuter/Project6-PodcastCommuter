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
      fromStreet: '',
      fromCity:'',
      fromProvince: '',
      toStreet: '',
      toCity: '',
      toProvince: '',
      from: '',
      to: '',
      userEntry: '',
      podData: [],
    }
  }

  // Function to grab commute time from Map.js
  // Function is called in Map.js
  grabCommuteTime = (time, callback) => {
    console.log(time)
    this.setState({
      appTime: time,
    }, callback)
  }

    routeSelected = () => {
    console.log('axios', this.state.appTime)
    axios({
      url: `https://listen-api.listennotes.com/api/v2/search`,
      method: `GET`,
      headers: { 'X-ListenAPI-Key': 'efedd950b2d84805a5c9ede9b4543e23' },
      dataResponse: `jsonp`,
      params: {
        q: this.state.userInput,
        type: "episode",
        language: 'English',
        // Taking commute time from Map.js, passing it to App.js and running it through grabCommuteTime function
        len_min: this.state.appTime,
        len_max: this.state.appTime + 5,
      }
    }).then((response) => {
      // creating new array with stuff from listenNotes API call
      console.log(response)


      const newState = [];
      response.data.results.map(function (podcast) {
        newState.push({
          podData: podcast,
          podTitle: podcast.title_original,
          podDescription: podcast.description_original,
          podImage: podcast.image,
          podUrl: podcast.podcast_listennotes_url,
          podTime: podcast.audio_length_sec,
          podAudio: podcast.audio,

        })
        return podcast;
      })

      // Use podData to display podcast information on the page
      this.setState({
        podData: newState,
      })
    });
  }
  

  // onChange function
  handleMapChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handlePodcastChange = (e) => {
    this.setState({
      userEntry: e.target.value,
    }, () => {
    })
  }


  

  handleSubmit = (e) => {
    e.preventDefault();
    const from = `${this.state.fromStreet.trim()}, ${this.state.fromCity.trim()}, ${this.state.fromProvince}`
    const to = `${this.state.toStreet.trim()}, ${this.state.toCity.trim()}, ${this.state.toProvince}`

    this.setState({
      from: from,
      to: to,
      userInput: this.state.userEntry,
    })
  }

  // Importing components and vital information for app to run
  render(){
    return(
      <div>
        {/* Get user input */}
        <form action="" onSubmit={this.handleSubmit} className="mapForm">
          <label htmlFor="from">Start</label>
          <input type="text" id="fromStreet" name="fromStreet" placeholder="enter street name" value={this.state.fromStreet} onChange={this.handleMapChange} />
          <input type="text" id="fromCity" name="fromCity" placeholder="enter city" value={this.state.fromCity} onChange={this.handleMapChange} />
          <select name="fromProvince" id="fromProvince" onChange={this.handleMapChange}>
            <option value="">Choose Province/Territory</option>
            <option value="ON">Ontario</option>
            <option value="BC">British Columbia</option>
            <option value="QC">Quebec</option>
            <option value="NS">Nova Scotia</option>
            <option value="NB">New Brunswick</option>
            <option value="AB">Alberta</option>
            <option value="PE">Prince Edward Island</option>
            <option value="SK">Saskatchewan</option>
            <option value="NL">Newfoundland and Labrador</option>
            <option value="MB">Manitoba</option>
            <option value="NT">Northwest Territories</option>
            <option value="YT">Yukon</option>
            <option value="NU">Nunavut</option>
          </select>
          <label htmlFor="end">End</label>
          <input type="text" id="toStreet" name="toStreet" placeholder="enter street name" value={this.state.toStreet} onChange={this.handleMapChange} />
          <input type="text" id="toCity" name="toCity" placeholder="enter city" value={this.state.toCity} onChange={this.handleMapChange} />
          <select name="toProvince" id="toProvince" onChange={this.handleMapChange}>
            <option value="">Choose Province/Territory</option>
            <option value="ON">Ontario</option>
            <option value="BC">British Columbia</option>
            <option value="QC">Quebec</option>
            <option value="NS">Nova Scotia</option>
            <option value="NB">New Brunswick</option>
            <option value="AB">Alberta</option>
            <option value="PE">Prince Edward Island</option>
            <option value="SK">Saskatchewan</option>
            <option value="NL">Newfoundland and Labrador</option>
            <option value="MB">Manitoba</option>
            <option value="NT">Northwest Territories</option>
            <option value="YT">Yukon</option>
            <option value="NU">Nunavut</option>
          </select>
          <input
            type="text"
            className="podcastSearch"
            placeholder='Search'
            onChange={this.handlePodcastChange}
            value={this.state.userEntry}>
          </input>
          <button className="mapSubmitButton">Submit</button>
        </form>

        <Map 
        grabCommuteTime={this.grabCommuteTime} 
        from={this.state.from} 
        to={this.state.to}
        routeSelected={this.routeSelected}
        />
        <Podcast 
        time={this.state.appTime} 
        userInput={this.state.userInput}
        podData={this.state.podData}
        />
      </div>
    )
  }
}

export default App;


