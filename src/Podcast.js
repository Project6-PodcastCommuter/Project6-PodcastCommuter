import React, { Component } from 'react';
import './App.scss';
import axios from 'axios';


// Functionality involving Podcast API
class Podcast extends Component {
    constructor() {
        super();
        
        // userInput - keyword for podcast
        // podData - pushing details into array
        this.state = {
            userInput: '',
            podData: [],
            podTitle: '',
            podDescription: '',
            podImage: '',
            podUrl: '',
            podTime: '',
            podAudio: '',
        }
        
    }


    // Saving podcast search keyword
    handleChange = (e) => {
        console.log(e.target.value)

        this.setState({
            userInput: e.target.value,
        })
    }


    // Submitting podcast keyword search
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
                language: 'English',
                // Taking commute time from Map.js, passing it to App.js and running it through grabCommuteTime function
                len_min: this.props.time,
                len_max: this.props.time + 5,
            }
        }).then((response) => {
            // creating new array with stuff from listenNotes API call
            console.log(response);
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




    render() {
        return (
            <div className="podcastContent">
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
                    {/* Dynamically printing podcast information on the page */}
                    {this.state.podData.map((response) => {
                        return (
                            <div>
                                <h3>{response.podTitle}</h3>
                                <p>{response.podDescription}</p>
                                <p>{response.podUrl}</p>
                                <img src={response.podImage} alt={this.state.podTitle}></img>
                                <p>{Math.floor(response.podTime / 60)} minutes</p>
                                <audio 
                                    controls
                                    src={response.podAudio}>
                                </audio>
                            </div>
                        )
                    })}



                </div>
            </div>
        )
    }
}


export default Podcast;