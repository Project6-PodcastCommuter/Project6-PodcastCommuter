import React, { Component } from 'react';
import './App.scss';
import axios from 'axios';


class Podcast extends Component {
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
        console.log(this.props.time)
        axios({
            url: `https://listen-api.listennotes.com/api/v2/search`,
            method: `GET`,
            headers: { 'X-ListenAPI-Key': 'efedd950b2d84805a5c9ede9b4543e23' },
            dataResponse: `jsonp`,
            params: {
                q: this.state.userInput,
                type: "episode",
                language: 'English',
                // these will have to be dynamic, based on user's duration of commute
                len_min: this.props.time,
                len_max: this.props.time + 5,
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
        console.log(this.props.time)
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


export default Podcast;