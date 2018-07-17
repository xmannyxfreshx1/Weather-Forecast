import React, { Component } from 'react';
import './App.css';
import Titles from './Components/Titles';
import Form from './Components/Form';
import Weather from './Components/Weather';
import  Moment  from 'react-moment';
import Ionicon from 'react-ionicons';


const API_KEY='&APPID=5d0f96e287e14ac1b4f50479acb18f9f';

const iconNames = {
    Default:'ios-time',
    Clear: 'ios-sunny' ,
    Rain: 'ios-rainy' ,
    Thunderstorm: 'ios-thunderstorm' ,
    Clouds: 'ios-cloudy' ,
    Snow: 'ios-snow' ,
    Drizzle: 'ios-umbrella' ,
};




class App extends Component {

    state = {
        temperature:null,
        weather:'Default',
        city:null,
        country:null,
        humidity:null,
        description:null,
        error:null,
        list: [null],
        forecastClicked: false,
        weatherClicked: false,
    };

    getWeather = async (e) =>{
        e.preventDefault();
        const city = e.target.elements.city.value;
        const country = e.target.elements.country.value;
        const api_call= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}${API_KEY}`);
        const data = await api_call.json();


        if(data.cod === '404') {
            this.setState({
                temperature: null,
                weather:'Alert',
                city: null,
                country: null,
                humidity: null,
                description: null,
                error: "ENTER A VALID CITY AND COUNTRY",
                forecastClicked: false,
                weatherClicked: true,
            });

            console.log(data);
        }else{
            this.setState({
                temperature: Math.round((data.main.temp) * (9 / 5) - 459.67),
                weather:data.weather[0].main,
                city: data.name,
                country: data.sys.country,
                humidity: data.main.humidity,
                description: data.weather[0].description,
                error: "",
                weatherClicked:true
            });
        }
    };

    getForecast = async (e) => {
        e.preventDefault();
        const city = this.state.city;
        const country = this.state.country;
        const api_call = await fetch (`https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=3a5fbdb21d0c6479ff9cff57c0e067bc&units=imperial`);
        const data = await api_call.json();

        if(data.cod === '404'){
            this.setState({
                list: null,
                forecastClicked: false,
                error: "ENTER A VALID CITY AND COUNTRY",
                weatherClicked: true
            })
        }else {


            this.setState({
                list: data.list,
                forecastClicked: true,
                weatherClicked: true,
                error:""
            });
        }

    };




    /*

       constructor(props) {
           super(props);
           this.state = {
               error: null,
               isLoaded: false,
               items: []


           };

       }
   */

    render() {
        let newList = [];
        {this.state.forecastClicked && this.state.list.map((value, index, array) => {return newList = [array[7], array[15], array[23], array[31], array[39]]} )}

        return (
            <div>

                <div className="wrapper">
                    <div className="main">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-xs-5 title-container">
                                    <Titles error = {this.state.error} weatherClicked={this.state.weatherClicked} weatherState={this.state.weather}/>
                                </div>
                                <div className="col-xs-7 form-container">
                                    <Form getWeather={this.getWeather}/>
                                    <Weather
                                        temperature={this.state.temperature}
                                        city={this.state.city}
                                        country={this.state.country}
                                        humidity={this.state.humidity}
                                        description={this.state.description}
                                        error={this.state.error}
                                    />
                                    {this.state.weatherClicked && <button onClick={this.getForecast}>5-Day Forecast</button>}
                                    <div className="col-xs-7 forecast">
                                        <div className="card">

                                            {this.state.forecastClicked && newList.map((value, index, array) =>

                                                <div key={index}  className="card--content">
                                                    <div className="card--content--left">
                                                        <Ionicon color={"white"} fontSize={"100px"} icon={iconNames[value.weather[0].main]}/>
                                                    </div>

                                                    <div className="card--content--right">
                                                        <div>Date: <span className="forecast_value"><Moment format="MM/DD/YYYY" unix>{value.dt}</Moment></span></div>
                                                        <div>Temperature: <span className="forecast_value">{Math.round(value.main.temp)}°</span></div>
                                                        <div>Humidity: <span className="forecast_value">{value.main.humidity}%</span></div>
                                                        <div>Description: <span className="forecast_value">{value.weather[0].description}</span></div>
                                                    </div>

                                                </div>)}

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        );
    }
}


export default App;
