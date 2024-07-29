
import React from 'react';
import { Link } from 'react-router-dom';

function WeatherCard({ data }) {
  return (
    <div className="weather-card">
      <h2>{data.name}</h2>
      <p>{data.weather[0].description}</p>
      <p>{Math.round(data.main.temp - 273.15)}°C</p>
      <Link to={`/details/${data.name}`}>View Details</Link>
    </div>
  );
}

export default WeatherCard;
