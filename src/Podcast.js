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
            podDescriptionSecond: ''
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

    readMore = (e) =>{
        document.querySelector(`.podcastOriginal${e.target.id}`).append(e.target.value)
    }

    render() {
        return (
            <div className="podcastContent">        
                <section className="wrapper">
                    <div>
                        <h3>Pick a Podcast</h3>
                        <p>Here are some podcasts that match your commute time.</p>
                    </div>
                    <div className="podcastResults">
                        {/* Dynamically printing podcast information on the page */}
                        {this.props.podData.map((response, index) => {
                            return (
                                <div className="podcast">
                                    <div className={`podcastOriginal${index}`}>
                                        <img src={response.podImage} className="podcastImg" alt={this.state.podTitle}></img>
                                        <h4>{response.podTitle}</h4>
                                        <p className="podcastTime">{Math.floor(response.podTime / 60)} min.</p>
                                        <p>{response.podDescription.slice(0, 250)}</p>
                                    </div>
                                    {response.podDescription.length > 250 ? 
                                        <button onClick={this.readMore} id={index} className="readMore" value={response.podDescription.slice(251, 2000)}>Read More</button>
                                    : null }
                                    <button onClick={this.selectedPodcast} className="podcastButton" value={response.podUrl}>Choose
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                </section>
                
                { this.state.selectedPodcast.length === 0 ? null : 
                <section>
                    <h3 className="finalPodcastTag">Have a listen and enjoy your commute</h3>
                    <div className="selectedAudio finalPodcastContent">
                        <div>
                            <div className="finalPodcastImage">
                                <img src={this.state.selectedPodcast.podImage} className="finalPodcastImg" alt={this.state.selectedPodcast.podTitle}></img>
                            </div>
                            <div className="finalPodcastInfo">
                                <h3>{this.state.selectedPodcast.podTitle}</h3>
                                <p>{this.state.selectedPodcast.podDescription}</p>
                                <button onClick={this.readMore} className="readMore">Read More</button>
                            </div>
                        </div>
                        <audio 
                            className="finalPodcastAudio"
                            controls
                            src={this.state.selectedPodcast.podAudio}>
                        </audio>
                    </div>
                </section>
                } 
            </div>
        )
    }
}


export default Podcast;