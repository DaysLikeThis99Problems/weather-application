import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchEngine from "./SearchEngine";
import Current from "./Current";
import Forecast from "./Forecast";
import AirQuality from "./AirQuality";
import ToggleView from "../ForecastAQI/ToggleView";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faBook } from '@fortawesome/free-solid-svg-icons';



import "../styles.css";

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({
    loading: true,
    data: {},
    error: false,
    city:"",
  });

  const toDate = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const currentDate = new Date();
    const date = `${days[currentDate.getDay()]} ${currentDate.getDate()} ${
      months[currentDate.getMonth()]
    }`;
    return date;
  };

  const search = async (event) => {
    event.preventDefault();
    if(query!==""){
      if (event.type === "click" || (event.type === "keypress" && event.key === "Enter")) {
        setWeather({ ...weather, loading: true });
        const url='http://api.weatherapi.com/v1/current.json?key={key}&q='+query+'&aqi=yes';
  
        try {
          const res = await axios.get(url);
          const cityname=res.data.location.name;
          setWeather({ data: res.data, loading: false, error: false,city:cityname });
        } catch (error) {
          setWeather({ ...weather, data: {}, error: true });
          console.log("Error fetching weather data:", error);
        }
      }
      
    }else{
      alert("Please Enter the City")
    }
    
  };

  useEffect(() => {
    const fetchData = async () => {
      const url='http://api.weatherapi.com/v1/current.json?key=cbb3dd09eb154a7bac5202523251401&q=pune&aqi=yes';

      try {
        const response = await axios.get(url);
        const cityname="pune";
        setWeather({ data: response.data, loading: false, error: false, city:cityname });
      } catch (error) {
        setWeather({ data: {}, loading: false, error: true });
        console.log("Error fetching initial weather data:", error);
      }
    };

    fetchData();
  }, []);
  const [searchData, setSearchData] = useState(null);
  const handleSearchChange = (data) => { 
    setSearchData(data); 
    setQuery(data.label);
    console.log("Selected City:", data);
  };
  
  const city=weather.city;

  return (
    <div className="App">
      {/* SearchEngine component */}
      {/* <SearchEngine onSearchChange={handleSearchChange} />
      <SearchEngine query={query} setQuery={setQuery} search={search} /> */}
      <SearchEngine query={query} setQuery={setQuery} search={search} onSearchChange={handleSearchChange} />
      
      {weather.loading && (
        <>
          <br />
          <br />
          <h4>Searching...</h4>
        </>
      )}

      {weather.error && (
        <>
          <br />
          <br />
          <span className="error-message">
            <span style={{ fontFamily: "font" }}>
              Sorry, city not found. Please try again.
            </span>
          </span>
        </>
      )}

      {weather && weather.data && weather.data.location && (
        // Current Weather component
        <Current weather={weather} toDate={toDate}/>
      )}
      {weather && weather.data && weather.data.location && (
        // Current Weather component
        <AirQuality weather={weather} toDate={toDate}/>
      )}
      {weather && weather.data && weather.data.location && (
        // Current Weather component
        <Forecast weather={weather} toDate={toDate}/>
      )}
      {weather && weather.data && weather.data.location && (
        // Current Weather component
        <ToggleView weather={weather} toDate={toDate}/>
      )}
      {weather && weather.data && weather.data.location && (
        // Current Weather component
        <div>
          <div><FontAwesomeIcon icon={faMapLocationDot} id="logo"/>
          <a href={`http://maps.google.com/?q=${city}`}>Google Map</a></div>
          <div><FontAwesomeIcon icon={faBook} id="logo"/>
          <a href={`https://en.wikipedia.org/wiki/${city}`}>History</a></div>
        </div>
      )}
      
    </div>
  );
}

export default App;