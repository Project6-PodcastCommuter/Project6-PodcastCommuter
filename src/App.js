import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';
import axios from 'axios';

// class Podcast extends Component{
//   constructor(){
//     super();

//     this.state={
//       keyword: '',
//     }
//   }

//   componentDidMount(){
//     axios({
//       url: `https://listen-api.listennotes.com/api/v2/search`,
//       method: `GET`,
//       headers: { 'X-ListenAPI-Key': 'efedd950b2d84805a5c9ede9b4543e23' },
//       dataResponse: `jsonp`,
//       params: {
//         q: 'star',
//         type: "podcast"
//       }
//     }).then((data) => {
//       console.log(data)
//     });
//   }

//   render(){
//     return(
//       <div className="podcastContent">
//         <div>Hi</div>
//         <h1>Testing</h1>
//       </div>
//     )
//   }
// }

// class Map extends Component{
//   constructor(){
//     super()
//     this.state={
//       from: '',
//       to: '',
//     }
//   }

//   componentDidMount(){
//     axios({
//       url: 'http://www.mapquestapi.com/directions/v2/route',
//       params: {
//         key: 'PgwvbKwVwtViQRmH4Rju1Xri2DmysmKb',
//         from: '5 St Joseph Street, Toronto',
//         to: '483 Queen St W, Toronto',
//         routeType: 'pedestrian'
//       }
//     }).then(response => {
//       console.log(response)
//     })
//   }
  
//   render(){
//     return(
//       <div className="mapContent">
//         <h1>Map testing</h1>
//       </div>
//     )
//   }
// }


class App extends Component{
  constructor() {
    super()
    this.state = {
      from: '',
      to: '',
      routeType: '',
      sessionId: '',
    }
  }

  componentDidMount() {
  
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
    const routeType = 'pedestrian'

    //axios for route
    axios({
      url: 'http://www.mapquestapi.com/directions/v2/route',
      params: {
        key: 'PgwvbKwVwtViQRmH4Rju1Xri2DmysmKb',
        from: this.state.from,
        to: this.state.to,
        routeType: routeType,
      }
    }).then(response => {
      // console.log(response)
      // userRouteTime is a string
      const userRouteTime = response.data.route.legs[0].formattedTime;
      const sessionId = response.data.route.sessionId;


      // this.setState({
      //   sessionId: sessionId
      // })
      // console.log(sessionId);
      // console.log(typeof(userRouteTime));
      // console.log(response)
    })

    const url = `https://www.mapquestapi.com/staticmap/v5/map?key=PgwvbKwVwtViQRmH4Rju1Xri2DmysmKb&start=${this.state.from}&end=${this.state.to}`
    console.log(url)




    // axios({
    //   url: 'https://www.mapquestapi.com/staticmap/v5/map',
    //   params: {
    //     key: 'PgwvbKwVwtViQRmH4Rju1Xri2DmysmKb',
    //     start: this.state.from,
    //     end: this.state.to,
    //   }
    // }).then(response => {
    //   // console.log(response)
    //   // userRouteTime is a string
    //   // const userRouteTime = response.data.route.legs[0].formattedTime;
    //   // const sessionId = response.data.route.sessionId;
    //   console.log(response)
    // })

// Route shape for pic of map
// Pass in longitute and latitude from previous api call to print pic of map
// Check mapquest api for this endpoint to see the info needed
  // axios({
  //   url: 'http://www.mapquestapi.com/directions/v2/routeshape',
  //     params: {
  //       key: 'PgwvbKwVwtViQRmH4Rju1Xri2DmysmKb',
  //       sessionId: this.state.sessionId,
  //       fullShape: true,
  //     }
  //   }).then(response => {
  //     const mapUrl = 
  //     console.log(response)
  //   })

    
  }

  render(){
    return (
      <div className="App">
        <form action="" onSubmit={this.mapUserInput} className="mapForm">
          <label htmlFor="from">Start</label>
          <input type="text" id="from" name="from" value={this.state.from} onChange={this.handleChange}/>
          <label htmlFor="end">End</label>
          <input type="text" id="to" name="to" value={this.state.to} onChange={this.handleChange}/>

          <button className="mapSubmitButton" onClick={this.mapSubmit}>Submit</button>
        </form>
      </div>
    );
  }
}

export default App;
