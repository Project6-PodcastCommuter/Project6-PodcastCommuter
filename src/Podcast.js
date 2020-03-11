import React, { Component } from 'react';
import './App.scss';


// Functionality involving Podcast API
class Podcast extends Component {
    constructor() {
        super();

        // userInput - keyword for podcast
        // podData - pushing details into array
        this.state = {
            selectedPodcast: [],
            podDescriptionSecond: '',
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
        // console.log(this.props.podData)
        return (
            <div className="podcastContent">   
            {this.props.podData.length === 0 
            ? 
            <div className="placeholderPodcast" id="podcastResults">
                <div className="emptyDiv wrapper">
                    <h3>Pick a Podcast</h3>
                    <div>
                        <p className="scrollUp">Scroll up to make a search!</p>
                    </div>
                </div>
            </div>
            :
                <section className='wrapper' id="podcastResults">
                    <div className='pickPodcast'>
                        <h3>Pick a Podcast</h3>
                        <p>Here are some podcasts that match your commute time.</p>
                    </div>
                    <div className="podcastResults">
                        {/* Dynamically printing podcast information on the page */}
                        {this.props.podData.map((response, index) => {
                            return (
                                <div className='podcastCard podcast'>
                                    <div>
                                            <img className="podcastImg" src={response.podImage} alt={this.state.podTitle}></img>
                                        <div>
                                            <h4>{response.podTitle}</h4>
                                            <p className="podcastTime">{Math.floor(response.podTime / 60)} minutes</p>
                                        </div>
                                            <p>{response.podDescription}</p>
                                            <a href={response.podUrl} className="readMore">More Details</a>
                                    </div>
                                    <div>
                                        <button className="choosePodcastButton podcastButton" onClick={this.selectedPodcast} value={response.podUrl}>Choose</button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </section>
            }     
                
                    { this.state.selectedPodcast.length === 0 
                    ?
                    <div className="placeholderPodcast" id="finalPodcast">
                        <div className="emptyDiv wrapper">
                            <h3>Have a listen and enjoy your commute</h3>
                            <div>
                                <p className="scrollUp">Scroll up to make a search!</p>
                            </div>
                        </div>
                    </div>
                    : 
                <section className='wrapper' id="finalPodcast">
                    <div>
                        <h3 className="finalPodcastTag">Have a listen and enjoy your commute</h3>
                        <div className="selectedAudio">
                            <div className="finalPodcastContent">
                            {/* <div className="selectedAudio finalPodcastContent"> */}
                                <div className="finalPodcastImage">
                                    <img src={this.state.selectedPodcast.podImage} alt={this.state.selectedPodcast.podTitle}></img>
                                </div>
                                <div className="finalPodcastInfo">
                                    <h3>{this.state.selectedPodcast.podTitle}</h3>
                                    <p>{this.state.selectedPodcast.podDescription}</p>
                                    <a href={this.state.selectedPodcast.podUrl} className="readMore">Read More</a>
                                </div>
                            </div>
                            <div class="audioDiv">
                            <audio 
                                className="finalPodcastAudio"
                                controls
                                src={this.state.selectedPodcast.podAudio}>
                            </audio>
                            </div>
                        </div>
                    </div>
                </section>
                } 
            </div>
        )
    }
}


export default Podcast;