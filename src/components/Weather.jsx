import React, { useState, useEffect, useRef } from "react";
import search from "../assets/search.png";
import "./Weather.css";
import clear from "../assets/clear.png";
import cloud from "../assets/cloud.png";
import drizzle from "../assets/drizzle.png";
import humidity from "../assets/humidity.png";
import snow from "../assets/snow.png";
import wind from "../assets/wind.png";

const Weather = () => {
  const inputref = useRef();
  const API = import.meta.env.VITE_APP_KEY;
  const [weatherData, setWeatherData] = useState(false);
  const allIcons = {
    "01d": clear,
    "01n": clear,
    "02d": cloud,
    "02n": cloud,
    "03d": cloud,
    "03n": cloud,
    "04d": cloud,
    "04n": cloud,
    "09d": drizzle,
    "09n": drizzle,
    "10d": drizzle,
    "10n": drizzle,
    "11d": drizzle,
    "11n": drizzle,
    "13d": snow,
    "13n": snow,
  };

  const search = async (city) => {
    if (city === "") {
      alert("Please enter a city name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API}`;
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);

      if (!res.ok) {
        alert(data.message);
        return;
      }
      console.log(data);

      const icon = allIcons[data.weather[0].icon] || clear;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
      console.log(WeatherData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    search("London");
  }, []);

  return (
    <div className="weather">
      <div className="search-bar">
        <input type="text" ref={inputref} placeholder="Search for a city..." />
        <button onClick={() => search(inputref.current.value)}>Search</button>
      </div>
      {weatherData ? (
        <>
          <img src={weatherData.icon} alt="" />
          <p className="temperature"> {weatherData.temperature}°c</p>
          <p className="location">{weatherData.location} </p>
          <div className="weather-data">
            <div className="col">
              <img src={weatherData.icon} alt="" />
              <div>
                <p> {weatherData.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind} alt="" />
              <div>
                <p> {weatherData.windSpeed}km/h</p>
                <span>wind speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Weather;
