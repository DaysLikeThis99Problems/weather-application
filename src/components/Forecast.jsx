import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Forecast({ weather}) {
  const { data } = weather;
  const [isCelsius, setIsCelsius] = useState(true); // Track temperature unit
  const [fcd,setFcd]=useState({day1:"",day2:"",day3:"",temp1:"",temp2:"",temp3:""});

  useEffect(() => {
    const fetchData = async () => {
      const url='http://api.weatherapi.com/v1/forecast.json?key={key}&q='+data.location.name+'&days=3&aqi=yes&alerts=no';

      try {
        const response = await axios.get(url);
        setFcd({day1:response.data.forecast.forecastday[0].date,
            day2:response.data.forecast.forecastday[1].date,
            day3:response.data.forecast.forecastday[2].date,
            temp1:response.data.forecast.forecastday[0].day.avgtemp_c,
            temp2:response.data.forecast.forecastday[1].day.avgtemp_c,
            temp3:response.data.forecast.forecastday[2].day.avgtemp_c,
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

  const renderTemperature = (temperature) => {
    return isCelsius
      ? Math.round(temperature)
      : convertToFahrenheit(temperature);
  };

  return (<>
        <h3>Next Day Forecast:</h3>
        <pre>DATE        TEMP</pre>
        <p>{fcd.day1}:  {renderTemperature(fcd.temp1)}<sup className="temp-deg1" onClick={toggleTemperatureUnit}>{isCelsius ? "°C" : "°F"} | {isCelsius ? "°F" : "°C"}
        </sup></p>
        <p>{fcd.day2}: {renderTemperature(fcd.temp2)}<sup className="temp-deg1" onClick={toggleTemperatureUnit}>{isCelsius ? "°C" : "°F"} | {isCelsius ? "°F" : "°C"}
        </sup></p>
        <p>{fcd.day3}: {renderTemperature(fcd.temp3)}<sup className="temp-deg1" onClick={toggleTemperatureUnit}>{isCelsius ? "°C" : "°F"} | {isCelsius ? "°F" : "°C"}
        </sup></p>
  </>
  );
}

export default Forecast;