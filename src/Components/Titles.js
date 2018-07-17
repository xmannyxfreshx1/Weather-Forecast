import React from 'react';
import Ionicon from 'react-ionicons';

const iconNames = {
    Default:'ios-time',
    Clear: 'ios-sunny' ,
    Rain: 'ios-rainy' ,
    Thunderstorm: 'ios-thunderstorm' ,
    Clouds: 'ios-cloudy' ,
    Snow: 'ios-snow' ,
    Drizzle: 'ios-umbrella' ,
    Alert: 'ios-alert'
};


const Titles = props => (
    <div>
        <h1 className="title-container__title">Weather Finder</h1>
        {props.weatherClicked && <Ionicon color={"white"} fontSize={"350px"} icon={iconNames[props.weatherState]} />}
        <p className="title-container__subtitle">Find current weather, 5-day forecast, and more</p>
    </div>
);

export default Titles;