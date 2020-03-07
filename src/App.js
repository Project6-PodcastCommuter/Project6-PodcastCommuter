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
      routeResult: {},
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
    const stateToBeSet = {}

    const routeType = ['pedestrian', 'bicycle']

    //axios for route
    routeType.forEach((type) => {
      const routeDetail = {}
      axios({
        url: 'http://www.mapquestapi.com/directions/v2/route',
        params: {
          key: 'PgwvbKwVwtViQRmH4Rju1Xri2DmysmKb',
          from: this.state.from,
          to: this.state.to,
          routeType: type,
        }
      }).then(response => {
        // console.log(response)
        // userRouteTime is a string
        const userRouteTime = response.data.route.legs[0].formattedTime;
        const hour = userRouteTime.slice(0, 2);
        const minutes = userRouteTime.slice(3, 5);
        const mapImage = `https://www.mapquestapi.com/staticmap/v5/map?key=PgwvbKwVwtViQRmH4Rju1Xri2DmysmKb&start=${this.state.from}&end=${this.state.to}`

        
        routeDetail['travelHour'] = hour;
        routeDetail['travelMinute'] = minutes;
        routeDetail['mapImage'] = mapImage;

        stateToBeSet[type] = routeDetail
        console.log('state to be set',stateToBeSet)
        this.setState({
          routeResult: stateToBeSet,
        }, () => {
          console.log('after set state',this.state)
        })
      })
    })
  }

  chooseBike = () => {
    const time = Number(this.state.routeResult['bicycle']['travelHour']) * 60 + Number(this.state.routeResult['bicycle']['travelMinute'])
    console.log(time)

    this.setState({
      commuteTime: time,
    })
  }

  chooseWalk = () => {
    const time = Number(this.state.routeResult['pedestrian']['travelHour']) * 60 + Number(this.state.routeResult['pedestrian']['travelMinute'])
    console.log(time)

    this.setState({
      commuteTime: time,
    })
  }

  render() {
    const pedestrianInfo = this.state.routeResult.pedestrian
    console.log(this.state.routeResult)
    console.log(pedestrianInfo)
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

        {(this.state.routeResult['bicycle'] == undefined & this.state.routeResult['pedestrian'] == undefined) ? <p>HI</p> : (

          <div className="routeResults">
            <div className="pedestrianResult">
              <div className="mapContainer">

                <img src={this.state.routeResult['pedestrian']['mapImage']} alt="Travel route map from start to end" />

              </div>
              {this.state.routeResult['pedestrian']['travelHour'] !== "00" ? <p>It's going to take {this.state.routeResult['pedestrian']['travelHour']} hrs {this.state.routeResult['pedestrian']['travelMinute']} minutes to walk.</p> : <p>It's going to take {this.state.routeResult['pedestrian']['travelMinute']} minutes to walk.</p>}
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


