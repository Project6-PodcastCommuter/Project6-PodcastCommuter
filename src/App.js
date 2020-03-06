import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();

    this.state = {
      userInput: '',
      podData: [],
      podTitle: '',
      podDescription: '',
      podImage: '',
      podUrl: ''
    }
  }



  handleChange = (e) => {
    console.log(e.target.value)

    this.setState({
      userInput: e.target.value,
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();

    axios({
      url: `https://listen-api.listennotes.com/api/v2/search`,
      method: `GET`,
      headers: { 'X-ListenAPI-Key': 'efedd950b2d84805a5c9ede9b4543e23' },
      dataResponse: `jsonp`,
      params: {
        q: this.state.userInput,
        type: "episode",
        // these will have to be dynamic, based on user's duration of commute
        len_min: 10,
        len_max: 15
      }
    }).then((response) => {

      const newState = [];
      response.data.results.map(function (podcast) {
        // console.log(podcast);

        newState.push({
          podData: podcast,
          podTitle: podcast.title_original,
          podDescription: podcast.description_original,
          podImage: podcast.image,
          podUrl: podcast.podcast_listennotes_url,
        })

      })

      console.log(newState);

      this.setState({
        podData: newState,
      })


      // this.setState = ({
      //   podData: 'response.data.results',
      //   podTitle: 'response.data.results.title_original',
      //   podDescription: 'response.data.results.description_original',
      //   podImage: 'response.data.results.image',
      //   podUrl: 'response.data.results.podcast_listennotes_url',

      // })
      // console.log(response);
    });
  }




  render() {
    return (
      <div className="podcastContent">
        <div>Hi</div>
        <h1>Testing</h1>
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
        <div>

        {this.state.podData.map((response) => {
          return (
            <div>
              <h3>{response.podTitle}</h3>
              <p>{response.podDescription}</p>
              <p>{response.podUrl}</p>
              <img src={response.podImage} alt={this.state.podTitle}></img>
            </div>
          )
        })}



        </div>
      </div>
    )
  }
}

// class Map extends Component{
//   constructor(){
//     super()
//     this.state={
//       start: '',
//       end: '',
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


// class App extends Component{
//   render(){
//     return (
//       <div className="App">
//         <Podcast />
//         {/* <Map /> */}
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <p>
//             Edit <code>src/App.js</code> and save to reload.
//           </p>
//           <a
//             className="App-link"
//             href="https://reactjs.org"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             BEST GROUP!🙌
//           </a>
//         </header>
//       </div>
//     );
//   }
// }

export default App;
