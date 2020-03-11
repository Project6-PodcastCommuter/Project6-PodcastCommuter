import React, { Component } from 'react';
import './App.scss';
import axios from 'axios';
import Map from './Map.js'
import Podcast from './Podcast';


// App holds all components and elements vital to structure of the page

class App extends Component {
  constructor(props){
    super(props);
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
      console.log(response)
      // creating new array with stuff from listenNotes API call
      console.log('podcast',response.data.count)
      if (response.data.count === 0){
        alert('there is no podcast that meets our requirement')
      }else{
        const newState = [];
        response.data.results.map(function (podcast) {
          newState.push({
            podData: podcast,
            podTitle: podcast.podcast_title_original,
            podDescription: podcast.title_original,
            podImage: podcast.image,
            podUrl: podcast.listennotes_url,
            podTime: podcast.audio_length_sec,
            podAudio: podcast.audio,

          })
          return podcast;
        })

        // Use podData to display podcast information on the page
        this.setState({
          podData: newState,
        })
      }
    })
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
    e.target.reset();
    const from = `${this.state.fromStreet.trim()}, ${this.state.fromCity.trim()}, ${this.state.fromProvince}`
    const to = `${this.state.toStreet.trim()}, ${this.state.toCity.trim()}, ${this.state.toProvince}`
    this.setState({
      fromCity: '',
      fromStreet: '',
      fromProvince: '',
      toCity: '',
      toProvince: '',
      toStreet: '',
      from: from,
      to: to,
      userInput: this.state.userEntry,
      userEntry: ''
    })
  }


  // Importing components and vital information for app to run
  render(){
    return(
      <div>
        <header>
          <nav className="wrapper">
            <img className="logo" src={require('./assets/logo.png')}></img>
            <ul className="mainNav">
              <li><a href="">Search</a></li>
              <li><a href="#mapResults">Results</a></li>
              <li><a href="#podcastResults">Recommendations</a></li>
              <li><a href="#finalPodcast">Listen</a></li>
            </ul>
            <i class="fas fa-bars"></i>
          </nav>
          <div className="headerContent wrapper">
            <div className="headerInfo">
              <h1>Podcast Commuter</h1>
              <h2 className="headerDescriptionMobile">Find podcasts that suit your length of commute</h2>
              <button>Start</button>
            </div>
            <div className="headerImage">
              <img className="desktopImg" src={require('./assets/headerDeskop.svg')}></img>
              <img className="mobileImg" src={require('./assets/headerMobile.svg')}></img>
            </div>
          </div>
        </header>


        {/* Get user input */}
        <section className="wrapper mobileMap"> 
          <div className="formInfo">
            <h3>Let's find some podcasts.</h3>
            <p>Enter your starting and ending location, along with what type of podcast you’re in the mood for. We will calculate
            your commute time, and ask your to select your preferred mode of transportation. Based on the time of your trip,
            we will give you some podcast recommendations.</p>
          </div>
          <form action="" onSubmit={this.handleSubmit} className="mapForm">
            <div className="mapInput">
              <input className="address" type="text" id="fromStreet" name="fromStreet" placeholder="Starting address" value={this.state.fromStreet} onChange={this.handleMapChange} required />
              <input className="city" type="text" id="fromCity" name="fromCity" placeholder="Starting city" value={this.state.fromCity} onChange={this.handleMapChange} required />
              <select className="province" name="fromProvince" id="fromProvince" onChange={this.handleMapChange} required>
                <option value="">Prov</option>
                <option value="ON">ON</option>
                <option value="BC">BC</option>
                <option value="QC">QC</option>
                <option value="NS">NS</option>
                <option value="NB">NB</option>
                <option value="AB">AB</option>
                <option value="PE">PE</option>
                <option value="SK">SK</option>
                <option value="NL">NL</option>
                <option value="MB">MB</option>
                <option value="NT">NT</option>
                <option value="YT">YT</option>
                <option value="NU">NU</option>
              </select>
            </div>
            <div class="mapInput">
              <input className="address" type="text" id="toStreet" name="toStreet" placeholder="Destination address" value={this.state.toStreet} onChange={this.handleMapChange} required/>
              <input className="city" type="text" id="toCity" name="toCity" placeholder="Destination city" value={this.state.toCity} onChange={this.handleMapChange} required/>
              <select className="province" name="toProvince" id="toProvince" onChange={this.handleMapChange} required>
                <option value="">Prov</option>
                <option value="ON">ON</option>
                <option value="BC">BC</option>
                <option value="QC">QC</option>
                <option value="NS">NS</option>
                <option value="NB">NB</option>
                <option value="AB">AB</option>
                <option value="PE">PE</option>
                <option value="SK">SK</option>
                <option value="NL">NL</option>
                <option value="MB">MB</option>
                <option value="NT">NT</option>
                <option value="YT">YT</option>
                <option value="NU">NU</option>
              </select>
            </div>
            <div className="podcastSearch">
              <input
                type="text"
                placeholder='Search for a Podcast'
                onChange={this.handlePodcastChange}
                value={this.state.userEntry} required>
              </input>
            </div>
            <div>
            <button className="mapSubmitButton">Search</button>
            </div>
          </form>
        </section>


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


