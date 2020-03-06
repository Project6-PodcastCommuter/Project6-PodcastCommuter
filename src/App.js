import React, { Component } from 'react';
import './App.scss';
import axios from 'axios';


class Map extends Component {
constructor() {
	super()
	this.state = {
	from: '5 st joseph street, Toronto',
	to: '485 Queen Street West, Toronto',
	routeType: '',
	travelHourPedestrian: "",
	travelMinutesPedestrian: "",
	mapImagePedestrian: "",
	travelHourBicycle: "",
	travelMinutesBicycle: "",
	mapImageBicycle: "",
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

render() {
	return (
	<div className="App">
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
			
				<img src={this.state.mapImagePedestrian} alt="Travel route map from start to end"/>
			
			</div>
			{this.state.travelHourPedestrian !== "00" ? <p>It's going to take {this.state.travelHourPedestrian} hrs {this.state.travelMinutesPedestrian} minutes to walk.</p> : <p>It's going to take {this.state.travelMinutesPedestrian} minutes to walk.</p>}

			</div>

			<div className="bicycleResult">
			<div className="mapContainer">

				<img src={this.state.mapImageBicycle} alt="Travel route map from start to end" />

			</div>
			{this.state.travelHourBicycle !== "00" ? <p>It's going to take {this.state.travelHourBicycle} hrs {this.state.travelMinutesBicycle} minutes to bike.</p> : <p>It's going to take {this.state.travelMinutesBicycle} minutes to bike.</p>}

			</div>

		</div>
		)}
	</div>
	);
}
}





class App extends Component {
<<<<<<< HEAD
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

        return podcast;

      })

      console.log(newState);

      this.setState({
        podData: newState,
      })
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
        <Map />
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
=======
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
		<Map />
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
>>>>>>> 6b29326c9387e3f2e538a980634ebeeabaa6231b
}

export default App;
