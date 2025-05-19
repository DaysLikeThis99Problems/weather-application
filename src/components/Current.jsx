import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWind } from '@fortawesome/free-solid-svg-icons';
import { faDroplet } from '@fortawesome/free-solid-svg-icons';

function Current({ weather}) {
  const { data } = weather;
  const [isCelsius, setIsCelsius] = useState(true); // Track temperature unit
  
  const getCurrentDate = () => {
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    const currentDate = new Date().toLocaleDateString("en-US", options);
    return currentDate;
  };

  const toggleTemperatureUnit = () => {
    setIsCelsius((prevState) => !prevState);
  };

  const convertToFahrenheit = (temperature) => {
    return Math.round((temperature * 9) / 5 + 32);
  };

  const renderTemperature = (temperature) => {
    return isCelsius
      ? Math.round(temperature)
      : convertToFahrenheit(temperature);
  };

  return (
    <div>
      <div className="city-name">
        <h2>
          {data.location.name}, <span>{data.location.country}</span>
        </h2>
      </div>
      <div className="date">
        <span>{getCurrentDate()}</span>
      </div>
      <div className="temp">
      {data.current.condition.icon && (
          <img
            src={data.current.condition.icon}
            className="temp-icon"
          />
        )} 
        <br />
        {renderTemperature(data.current.temp_c)}
        <sup className="temp-deg" onClick={toggleTemperatureUnit}>
          {isCelsius ? "°C" : "°F"} | {isCelsius ? "°F" : "°C"}
        </sup>
      </div>
      
      <p className="weather-des">Description of Weather: {data.current.condition.text}</p>
      <div className="weather-info">
        <div className="col">
        <FontAwesomeIcon icon={faWind} id="logo"/>
          <div>
            <p className="wind">{data.current.wind_mph} mph</p>
            <p>Wind speed</p>
          </div>
        </div>
        <div className="col">
        <FontAwesomeIcon icon={faDroplet} id="logo"/>
          <div>
            <p className="humidity">{data.current.humidity}%</p>
            <p>Humidity</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Current;