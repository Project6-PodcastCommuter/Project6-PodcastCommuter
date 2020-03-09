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
        if(prevProps.from != this.props.from){

            if (this.props.from !== '' && this.props.to !== '') {
                const routeType = ['pedestrian', 'bicycle']
    
                //mapping over the routeType and do axios calls 
                const promises = routeType.map((type) => {
                    return axios({
                        url: 'http://www.mapquestapi.com/directions/v2/route',
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
        // Referring to grabCommuteTime function in App.js, and assigning it to be a prop
        // Call grabCommuteTime function with value of "time"
        this.setState({
            commuteTime: time,
        }, () => {
            const {
                grabCommunteTime
            } = this.props;
            
            // console.log(time);
            grabCommunteTime(time)
            const {
                routeSelected
            } = this.props;

            routeSelected()
        })
    }

    chooseWalk =  () => {
        const time = Number(this.state.routeResult['pedestrian']['travelHour']) * 60 + Number(this.state.routeResult['pedestrian']['travelMinute'])
        console.log(time)

        this.setState({
            commuteTime: time,
        }, () => {
            const {
                grabCommunteTime
            } = this.props;

            grabCommunteTime(time)
        
            setTimeout(() => {
                const {
                    routeSelected
                } = this.props;
                routeSelected() 
            }, 100)
        })
    }

    render() {

        

        return (
            <div className="App">

                {/* when there is nothing in the routeResult, show nothing */}
                {/* otherwise, show results */}
                {(this.state.routeResult['bicycle'] == undefined & this.state.routeResult['pedestrian'] == undefined) ? null : (

                    <div className="routeResults">
                        {/* grab map url from the routeResult and display it */}
                        <div className="mapContainer">
                            <img src={this.state.routeResult['pedestrian']['mapImage']} alt="Travel route map from start to end" />
                        </div>

                        <div className="pedestrianResult">
                            {/* Do not display hours when time is under 60 minutes */}
                            {this.state.routeResult['pedestrian']['travelHour'] !== "00" ? <p>It's going to take {this.state.routeResult['pedestrian']['travelHour']} hrs {this.state.routeResult['pedestrian']['travelMinute']} minutes to walk.</p> : <p>It's going to take {this.state.routeResult['pedestrian']['travelMinute']} minutes to walk.</p>}
                            <button type='submit' 
                            onClick={this.chooseWalk}
        
                             alt='' >Walk</button>
                        </div>


                        <div className="bicycleResult">
                            {this.state.routeResult['bicycle']['travelHour'] !== "00" ? <p>It's going to take {this.state.routeResult['bicycle']['travelHour']} hrs {this.state.routeResult['bicycle']['travelMinute']} minutes to bike.</p> : <p>It's going to take {this.state.routeResult['bicycle']['travelMinute']} minutes to bike.</p>}
                            <button type='submit' 
                            onClick={this.chooseBike}
                             alt='' >Bike</button>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default Map;