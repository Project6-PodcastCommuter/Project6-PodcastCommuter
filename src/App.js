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
      fromStreet: '',
      fromCity:'',
      fromProvince: '',
      toStreet: '',
      toCity: '',
      toProvince: '',
      from: '',
      to: '',
    }
  }
  

  // onChange function
  handleChange = (e) => {
    // const fromStreet = e.target.value
    this.setState({
      [e.target.name]: e.target.value
    })
  }


  mapUserInput = (e) => {
    e.preventDefault()
    const from = `${this.state.fromStreet.trim()}, ${this.state.fromCity.trim()}, ${this.state.fromProvince}`
    const to = `${this.state.toStreet.trim()}, ${this.state.toCity.trim()}, ${this.state.toProvince}`

    this.setState({
      from: from,
      to: to,
    })
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
        {/* Get user input */}
        <form action="" onSubmit={this.mapUserInput} className="mapForm">
          <label htmlFor="from">Start</label>
          <input type="text" id="fromStreet" name="fromStreet" placeholder="enter street name" value={this.state.fromStreet} onChange={this.handleChange} />
          <input type="text" id="fromCity" name="fromCity" placeholder="enter city" value={this.state.fromCity} onChange={this.handleChange} />
          <select name="fromProvince" id="fromProvince" onChange={this.handleChange}>
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
          <input type="text" id="toStreet" name="toStreet" placeholder="enter street name" value={this.state.toStreet} onChange={this.handleChange} />
          <input type="text" id="toCity" name="toCity" placeholder="enter city" value={this.state.toCity} onChange={this.handleChange} />
          <select name="toProvince" id="toProvince" onChange={this.handleChange}>
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
          <button className="mapSubmitButton" onClick={this.mapSubmit}>Submit</button>
        </form>

        <Map grabCommunteTime={this.grabCommunteTime} from={this.state.from} to={this.state.to}/>
        <Podcast time={this.state.appTime} />
      </div>
    )
  }
}

export default App;


