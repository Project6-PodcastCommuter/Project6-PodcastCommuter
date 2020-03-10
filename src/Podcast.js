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
            <div className="podcastContent wrapper">        
                <section>
                    <div>
                        <h3>Pick a Podcast</h3>
                        <p>Here are some podcasts that match your commute time.</p>
                    </div>
                    <div className="podcastResults">
                        {/* Dynamically printing podcast information on the page */}
                        {this.props.podData.map((response) => {
                            return (
                                <div className="podcast">
                                    <img src={response.podImage} alt={this.state.podTitle}></img>
                                    <div>
                                        <h4>{response.podTitle}</h4>
                                        <p>{Math.floor(response.podTime / 60)} minutes</p>
                                    </div>
                                    <p>{response.podDescription}</p>
                                    <a>Read More</a>
                                    <button onClick={this.selectedPodcast} value={response.podUrl}>Choose Podcast
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                </section>
                
                <section>
                    <h3>Have a listen and enjoy your commute</h3>
                    { this.state.selectedPodcast.length === 0 ? null : 
                        <div className="selectedAudio">
                            <div className="finalPodcastContent">
                                <div className="finalPodcastImage">
                                    <img src={this.state.selectedPodcast.podImage} alt={this.state.selectedPodcast.podTitle}></img>
                                </div>
                                <div className="finalPodcastInfo">
                                    <h3>{this.state.selectedPodcast.podTitle}</h3>
                                    <p>{this.state.selectedPodcast.podDescription}</p>
                                </div>
                            </div>
                            <audio 
                                className="finalPodcastAudio"
                                controls
                                src={this.state.selectedPodcast.podAudio}>
                            </audio>
                        </div>
                    } 
                </section>
            </div>
        )
    }
}


export default Podcast;