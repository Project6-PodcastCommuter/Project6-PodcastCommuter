import React, { Component } from 'react';
import './App.scss';
import axios from 'axios';

// Functionality involving MapQuest API
class Map extends Component {
    constructor() {
        super()
        // routeType takes strings of pedestrian or bike 
        // routeResult is an object that holds two objects (bicycle and pedestrian results)
        this.state = {
            routeType: '',
            routeResult: {},
            commuteTime: 0,
            isLoading: false,
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.from != this.props.from || prevProps.to != this.props.to){

            if (this.props.from !== '' && this.props.to !== '') {
                const routeType = ['pedestrian', 'bicycle']
    
                //mapping over the routeType and do axios calls 
                const promises = routeType.map((type) => {
                    return axios({
                        url: 'https://www.mapquestapi.com/directions/v2/route',
                        params: {
                            key: 'GjfNgstNA6zUKUgGcbkAzOwhHGvwyPRl',
                            from: this.props.from,
                            to: this.props.to,
                            routeType: type,
                        }
                    })
                })
    
                //catch the axios calls and put them in to the response array
                Promise.all(promises).then((responseArray) => {
                    //get time from the axios call
                    //taking the first element in the response array (pedestrain for now) and add the next one to create an object
                    console.log(responseArray)
                    const transformedResponse = responseArray.reduce((acc, response, i) => {
                        const userRouteTime = response.data.route.legs[0].formattedTime;
                        const hour = userRouteTime.slice(0, 2);
                        const minutes = userRouteTime.slice(3, 5);
                        const mapImage = `https://www.mapquestapi.com/staticmap/v5/map?key=GjfNgstNA6zUKUgGcbkAzOwhHGvwyPRl&size=600,250@2x&defaultMarker=marker-sm-81003c-81003c&routeColor=ff7600&type=map&start=${this.props.from}&end=${this.props.to}`
    
                        //separating bike and pedestrain so that they are their own object
                        return {
                            ...acc,
                            //once they are in their own object, add key value pairs to each object
                            [routeType[i]]: {
                                travelHour: hour,
                                travelMinute: minutes,
                                mapImage: mapImage,
                            }
                        }
                        // reduce syntax 
                    }, {})
    
                    // assigning objects to route result
                    this.setState({
                        routeResult: transformedResponse
                    })
                })
            }
        }
    }

    // If user chooses bike
    chooseBike = () => {
        // selecting value from routeResult state
        // "time" is holding travel time in minutes
        const time = Number(this.state.routeResult['bicycle']['travelHour']) * 60 + Number(this.state.routeResult['bicycle']['travelMinute'])

        // Setting commuteTime to "time"
        // Referring to grabCommunteuteTime function in App.js, and assigning it to be a prop
        // Call grabCommunteuteTime function with value of "time"
        this.setState({
            commuteTime: time,
        }, () => {
            const {
                grabCommuteTime,
                routeSelected
            } = this.props;
            
            // console.log(time);
            grabCommuteTime(time, routeSelected)
        })
    }

    chooseWalk =  () => {
        const time = Number(this.state.routeResult['pedestrian']['travelHour']) * 60 + Number(this.state.routeResult['pedestrian']['travelMinute'])
        console.log(time)

        this.setState({
            commuteTime: time,
        }, () => {
            const {
                grabCommuteTime,
                routeSelected
            } = this.props;

            grabCommuteTime(time, routeSelected)
        
            // setTimeout(() => {
            //     const {
            //         routeSelected
            //     } = this.props;
            //     routeSelected() 
            // }, 100)
        })
    }

    render() {

        

        return (
            <div className="App">

                {/* when there is nothing in the routeResult, show nothing */}
                {/* otherwise, show results */}
                {(this.state.routeResult['bicycle'] === undefined & this.state.routeResult['pedestrian'] === undefined) ? null : (

                    <section className="routeResults">
                        {/* grab map url from the routeResult and display it */}
                        <div className="mapContainer">
                            <img src={this.state.routeResult['pedestrian']['mapImage']} alt="Travel route map from start to end" />
                        </div>

                        <div className="commuteOptions">
                            <div className="pedestrianResult">
                                <img src={require('./assets/walk.svg')} className="mobileRouteTypeImg"></img>
                                {/* Do not display hours when time is under 60 minutes */}
                                
                                <button 
                                    type='submit'
                                    onClick={this.chooseWalk}
                                    className="routeTypeButton" >
                                        {this.state.routeResult['pedestrian']['travelHour'] !== "00"
                                        ?
                                        <p>{this.state.routeResult['pedestrian']['travelHour']} hrs {this.state.routeResult['pedestrian']['travelMinute']} min</p>
                                        :
                                        <p>{this.state.routeResult['pedestrian']['travelMinute']} min</p>}
                                </button>
                                <p>Walking is a great way to improve or maintain your overall health. Just 30 minutes every day can increase cardiovascular fitness, strengthen bones, reduce excess body fat, and boost muscle power and endurance</p>
                            </div>

                            <div className="bicycleResult">
                                <img src={require('./assets/bike.svg')} className="mobileRouteTypeImg"></img>
                                
                                <button type='submit'
                                    onClick={this.chooseBike}
                                    className="routeTypeButton" >
                                    {this.state.routeResult['bicycle']['travelHour'] !== "00"
                                        ?
                                        <p>{this.state.routeResult['bicycle']['travelHour']} hrs {this.state.routeResult['bicycle']['travelMinute']} min</p>
                                        :
                                        <p>{this.state.routeResult['bicycle']['travelMinute']} min</p>}
                                </button>
                                <p>Riding to work or the shops is one of the most time-efficient ways to combine regular exercise with your everyday routine. An estimated one billion people ride bicycles every day – for transport, recreation and sport.</p>
                            </div>
                        </div>
                        
                    </section>
                )}
            </div>
        );
    }
}

export default Map;