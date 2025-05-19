import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function AirQuality({ weather}) {
  const { data } = weather;
  const [isCelsius, setIsCelsius] = useState(true); // Track temperature unit
  const [AQ,setAQ]=useState({PM25:"",PM10:"",o3:"",no2:"",co:"",temp3:""});

  useEffect(() => {
    const fetchData = async () => {
      const url='http://api.weatherapi.com/v1/forecast.json?key={key}&q='+data.location.name+'&days=3&aqi=yes&alerts=no';

      try {
        const response = await axios.get(url);
        setAQ({PM25:response.data.current.air_quality.pm2_5,
            PM10:response.data.current.air_quality.pm10,
            o3:response.data.current.air_quality.o3,
            no2:response.data.current.air_quality.no2,
            co:response.data.current.air_quality.co,
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

  const PM25level=(data)=>{
    if(data<=50){
        return "😄Good";
    }else if(data<=100){
        return "😐Moderate";
    }else if(data<=150){
        return "😧Poor";
    }else if(data<=200){
        return "⚠️Unhealthy";
    }else if(data<=300){
        return "☢️Vary Unhealthy";
    }else{
        return "💀Hazardous";
    }
  }
  const PM10level=(data)=>{
    if(data<=50){
        return "😄Good";
    }else if(data<=100){
        return "😐Moderate";
    }else if(data<=150){
        return "😧Poor";
    }else if(data<=200){
        return "⚠️Unhealthy";
    }else if(data<=300){
        return "☢️Vary Unhealthy";
    }else{
        return "💀Hazardous";
    }
  }
  const o3level=(data)=>{
    if(data<=50){
        return "😄Good";
    }else if(data<=100){
        return "😐Moderate";
    }else if(data<=150){
        return "😧Poor";
    }else if(data<=200){
        return "⚠️Unhealthy";
    }else if(data<=300){
        return "☢️Vary Unhealthy";
    }else{
        return "💀Hazardous";
    }
  }
  const no2level=(data)=>{
    if(data<=60){
        return "😄Good";
    }else if(data<=120){
        return "😐Moderate";
    }else if(data<=180){
        return "😧Poor";
    }else if(data<=240){
        return "⚠️Unhealthy";
    }else if(data<=360){
        return "☢️Vary Unhealthy";
    }else{
        return "💀Hazardous";
    }
  }
  const colevel=(data)=>{
    if(data<=400){
        return "😄Good";
    }else if(data<=1000){
        return "😐Moderate";
    }else if(data<=2000){
        return "😧Poor";
    }else if(data<=5000){
        return "⚠️Unhealthy";
    }else if(data<=50000){
        return "☢️Vary Unhealthy";
    }else{
        return "💀Hazardous";
    }
  }
  const roundoff = (temperature) => {
    return  Math.round(temperature);
  };

  return (<>
    <h3>Today's Air Quality:</h3>
    <div>
        <ul id="list1">
            <li>PM2.5 AQI: {Math.round(AQ.PM25)} <span id="sp"> Condition:{PM25level(AQ.PM25)}</span></li>
            <li>PM10 AQI: {Math.round(AQ.PM10)} <span id="sp2">Condition:{PM10level(AQ.PM10)}</span></li>
            <li>o3 AQI: {Math.round(AQ.o3)} <span id="sp3"> Condition:{o3level(AQ.o3)}</span></li>
            <li>no2 AQI: {Math.round(AQ.no2)} <span id="sp4">Condition:{no2level(AQ.no2)}</span> </li>
            <li>co AQI: {Math.round(AQ.co)} <span id="sp5">Condition:{colevel(AQ.co)}</span> </li>
        </ul>
    </div>
        
  </>
  );
}

export default AirQuality;