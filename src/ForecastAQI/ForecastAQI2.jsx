import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function AirQuality({ weather}) {
  const { data } = weather;
  const [isCelsius, setIsCelsius] = useState(true); // Track temperature unit
  const [AQ,setAQ]=useState({MaxTemp:"",MinTemp:"",AvgTemp:"",humidity:"",maxWind:"",date:""});

  useEffect(() => {
    const fetchData = async () => {
      const url='http://api.weatherapi.com/v1/forecast.json?key={key}1&q='+data.location.name+'&days=3&aqi=yes&alerts=no';

      try {
        const response = await axios.get(url);
        setAQ({MaxTemp:response.data.forecast.forecastday[1].day.maxtemp_c,
            MinTemp:response.data.forecast.forecastday[1].day.mintemp_c,
            AvgTemp:response.data.forecast.forecastday[1].day.avgtemp_c,
            humidity:response.data.forecast.forecastday[1].day.avghumidity,
            maxWind:response.data.forecast.forecastday[1].day.maxwind_kph,
            date:response.data.forecast.forecastday[1].date,
        })
        
      } catch (error) {
        console.log("Error fetching initial weather data:", error);
      }
    };
    
    fetchData();
  }, [data.location.name]);

  const toggleTemperatureUnit = () => {
    setIsCelsius((prevState) => !prevState);
  };

  const convertToFahrenheit = (temperature) => {
    return Math.round((temperature * 9) / 5 + 32);
  };

  const roundoff = (temperature) => {
    return  Math.round(temperature);
  };

  const renderTemperature = (temperature) => {
    return isCelsius
      ? Math.round(temperature)
      : convertToFahrenheit(temperature);
  };

  return (<>
    <h3>{AQ.date}'s Air Quality:</h3>
    <div>
        <ul id="list1">
            <li>Maximum Temperature: {renderTemperature(AQ.MaxTemp)}<sup className="temp-deg1" onClick={toggleTemperatureUnit}>{isCelsius ? "°C" : "°F"} | {isCelsius ? "°F" : "°C"}
            </sup></li>
            <li>Minimum Temperature: {renderTemperature(AQ.MinTemp)}<sup className="temp-deg1" onClick={toggleTemperatureUnit}>{isCelsius ? "°C" : "°F"} | {isCelsius ? "°F" : "°C"}
            </sup></li>
            <li>Average Temperature: {renderTemperature(AQ.AvgTemp)}<sup className="temp-deg1" onClick={toggleTemperatureUnit}>{isCelsius ? "°C" : "°F"} | {isCelsius ? "°F" : "°C"}
            </sup></li>
            <li>Humidity: {AQ.humidity}%</li>
            <li>Maximum Wind: {AQ.maxWind}km/h</li>
        </ul>
    </div>
        
  </>
  );
}

export default AirQuality;