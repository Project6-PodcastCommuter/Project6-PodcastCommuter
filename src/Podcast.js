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
                <section>
                    <div>
                        <h3>Pick a Podcast</h3>
                        <p>Here are some podcasts that match your commute time.</p>
                    </div>
                    <div className="podcastResults">
                        {/* Dynamically printing podcast information on the page */}
                        {this.props.podData.map((response) => {
                            return (
                                <div>
                                    <img src={response.podImage} alt={this.state.podTitle}></img>
                                    <div>
                                        <h4>{response.podTitle}</h4>
                                        <p>{Math.floor(response.podTime / 60)} minutes</p>
                                    </div>
                                    <p>{response.podDescription}</p>
                                    <a>Read More</a>
                                    <button>Choose</button>
                                </div>
                            )
                        })}
                    </div>
                </section>
                
            </div>
        )
    }
}


export default Podcast;