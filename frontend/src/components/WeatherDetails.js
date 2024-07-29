
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function WeatherDetails() {
  const { city } = useParams();
  const [forecastData, setForecastData] = useState(null);

  useEffect(() => {
    fetch(`/forecast?city=${city}`)
      .then((response) => response.json())
      .then((data) => setForecastData(data))
      .catch((error) => console.error('Error fetching forecast data:', error));
  }, [city]);

  return (
    <div className="weather-details">
      {forecastData ? (
        forecastData.list.map((item, index) => (
          <div key={index} className="forecast-item">
            <p>{item.dt_txt}</p>
            <p>{item.weather[0].description}</p>
            <p>{Math.round(item.main.temp - 273.15)}°C</p>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default WeatherDetails;
