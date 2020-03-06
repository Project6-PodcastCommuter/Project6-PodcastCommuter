import React, { Component } from 'react';
import './App.scss';
import axios from 'axios';
import Podcast from './Podcast.js'


class Map extends Component {
  constructor() {
    super()
    this.state = {
      from: '283 dundas st. west, toronto, ON',
      to: '485 Queen St. West, Toronto, ON',
      routeType: '',
      travelHourPedestrian: "",
      travelMinutesPedestrian: "",
      mapImagePedestrian: "",
      travelHourBicycle: "",
      travelMinutesBicycle: "",
      mapImageBicycle: "",
      commuteTime: 0,
    }
  }

  // onChange function
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  mapSubmit = (e) => {
    //5 St Joseph Street, Toronto
    //485 Queen St W, Toronto
    e.preventDefault()

    //axios for PEDESTRIAN ROUTETYPE
    axios({
      url: 'http://www.mapquestapi.com/directions/v2/route',
      params: {
        key: 'PgwvbKwVwtViQRmH4Rju1Xri2DmysmKb',
        from: this.state.from,
        to: this.state.to,
        routeType: 'pedestrian',
      }
    }).then(response => {
      // console.log(response)
      // userRouteTime is a string
      const userRouteTime = response.data.route.legs[0].formattedTime;
      const hour = userRouteTime.slice(0, 2);
      const minutes = userRouteTime.slice(3, 5);

      this.setState({
        travelHourPedestrian: hour,
        travelMinutesPedestrian: minutes,
        mapImagePedestrian: `https://www.mapquestapi.com/staticmap/v5/map?key=PgwvbKwVwtViQRmH4Rju1Xri2DmysmKb&start=${this.state.from}&end=${this.state.to}`,
      })
    })

    //AXIOS CALL FOR BICYCLE ROUTE TYPE
    axios({
      url: 'http://www.mapquestapi.com/directions/v2/route',
      params: {
        key: 'PgwvbKwVwtViQRmH4Rju1Xri2DmysmKb',
        from: this.state.from,
        to: this.state.to,
        routeType: 'bicycle',
      }
    }).then(response => {
      // console.log(response)
      // userRouteTime is a string
      const userRouteTime = response.data.route.legs[0].formattedTime;
      const hour = userRouteTime.slice(0, 2);
      const minutes = userRouteTime.slice(3, 5);

      this.setState({
        travelHourBicycle: hour,
        travelMinutesBicycle: minutes,
        mapImageBicycle: `https://www.mapquestapi.com/staticmap/v5/map?key=PgwvbKwVwtViQRmH4Rju1Xri2DmysmKb&start=${this.state.from}&end=${this.state.to}`,
      })
    })
  }

  chooseBike = () => {
    const time = Number(this.state.travelHourBicycle) * 60 + Number(this.state.travelMinutesBicycle)
    console.log(time)

    this.setState({
      commuteTime: time,
    })
  }

  chooseWalk = () => {
    const time = Number(this.state.travelHourPedestrian) * 60 + Number(this.state.travelMinutesPedestrian)
    console.log(time)

    this.setState({
      commuteTime: time,
    })
  }

  render() {
    return (
      <div className="App">
        <Podcast
          commuteTime={this.state.commuteTime}
          
        />
        <form action="" onSubmit={this.mapUserInput} className="mapForm">
          <label htmlFor="from">Start</label>
          <input type="text" id="from" name="from" value={this.state.from} onChange={this.handleChange} />
          <label htmlFor="end">End</label>
          <input type="text" id="to" name="to" value={this.state.to} onChange={this.handleChange} />
          <button className="mapSubmitButton" onClick={this.mapSubmit}>Submit</button>
        </form>

        {!this.state.mapImagePedestrian ? null : (

          <div className="routeResults">
            <div className="pedestrianResult">
              <div className="mapContainer">

                <img src={this.state.mapImagePedestrian} alt="Travel route map from start to end" />

              </div>
              {this.state.travelHourPedestrian !== "00" ? <p>It's going to take {this.state.travelHourPedestrian} hrs {this.state.travelMinutesPedestrian} minutes to walk.</p> : <p>It's going to take {this.state.travelMinutesPedestrian} minutes to walk.</p>}
              <button onClick={this.chooseWalk} alt='' >Walk</button>
            </div>

            <div className="bicycleResult">
              <div className="mapContainer">

                <img src={this.state.mapImageBicycle} alt="Travel route map from start to end" />

              </div>
              {this.state.travelHourBicycle !== "00" ? <p>It's going to take {this.state.travelHourBicycle} hrs {this.state.travelMinutesBicycle} minutes to bike.</p> : <p>It's going to take {this.state.travelMinutesBicycle} minutes to bike.</p>}
              <button onClick={this.chooseBike} alt='' >Bike</button>
            </div>

              
          </div>
        )}

        
       
      </div>
    );
  }
}


export default Map;


