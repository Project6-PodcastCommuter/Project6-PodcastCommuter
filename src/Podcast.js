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
            selectedPodcast: [],


        }

    }

    selectedPodcast = (e) => {
        const selectedTitle = e.target.value
        const selectedPodcastData = this.props.podData.filter((podcast) => {
            return podcast.podUrl === selectedTitle;
        })
        this.setState({
            selectedPodcast: selectedPodcastData[0],
        })
    }


    render() {
        return (
            <div className="podcastContent">        
                <div>
                    {/* Dynamically printing podcast information on the page */}
                    {this.props.podData.map((response) => {
                        return (
                            <div>
                                <h3>{response.podTitle}</h3>
                                <p>{response.podDescription}</p>
                                <p>{response.podUrl}</p>
                                <img src={response.podImage} alt={this.state.podTitle}></img>
                                <p>{Math.floor(response.podTime / 60)} minutes</p>
                                <button onClick={this.selectedPodcast} value={response.podUrl}>Choose Podcast
                                </button>
                            </div>
                        )
                    })}
                </div>
                { this.state.selectedPodcast.length === 0 ? null : 
                    <div className="selectedAudio">
                        <h3>Have a listen and enjoy your commute</h3>
                        <h3>{this.state.selectedPodcast.podTitle}</h3>
                        <p>{this.state.selectedPodcast.podDescription}</p>
                        <p>{this.state.selectedPodcast.podUrl}</p>
                        <img src={this.state.selectedPodcast.podImage} alt={this.state.selectedPodcast.podTitle}></img>
                        <p>{Math.floor(this.state.selectedPodcast.podTime / 60)} minutes</p>
                        <audio
                            controls
                            src={this.state.selectedPodcast.podAudio}>
                        </audio>
                    </div>
                } 
            </div>
        )
    }
}


export default Podcast;