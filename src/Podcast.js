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
            podData: [],
        }

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